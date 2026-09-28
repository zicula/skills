#!/usr/bin/env bash
# dns-check.sh — check SPF / DKIM / DMARC / MX for your sending domain.
# Usage:
#   bash dns-check.sh <domain> [dkim-selector]
# Examples:
#   bash dns-check.sh sends.yourbrand.com
#   bash dns-check.sh sends.yourbrand.com google      # Google Workspace default selector
#   bash dns-check.sh sends.yourbrand.com selector1   # Microsoft 365 default selector
#
# Exit codes: 0 = checks ran, 2 = usage/dependency error.
# PASS/FAIL lines are printed to stdout; use this before every campaign
# (see SETUP.md chapter 6).
set -u

DOMAIN="${1:-}"
SELECTOR="${2:-}"
if [ -z "$DOMAIN" ]; then
  echo "usage: dns-check.sh <domain> [dkim-selector]" >&2
  exit 2
fi

# find a DNS lookup tool
LOOKUP=""
for t in dig nslookup; do
  if command -v "$t" >/dev/null 2>&1; then LOOKUP="$t"; break; fi
done
if [ -z "$LOOKUP" ]; then
  echo "ERROR: need 'dig' or 'nslookup' (macOS/Linux: brew install bind / apt install dnsutils)" >&2
  exit 2
fi

# txt <name>  -> all TXT strings joined, one per line
txt() {
  local name="$1"
  if [ "$LOOKUP" = "dig" ]; then
    dig +short TXT "$name" 2>/dev/null | tr -d '"' | tr '\t' ' ' | sed '/^$/d'
  else
    nslookup -type=TXT "$name" 2>/dev/null | sed -n 's/^.*text = //p' | tr -d '"' | sed '/^$/d'
  fi
}

# mx <name> -> mail exchanger lines
mx() {
  local name="$1"
  if [ "$LOOKUP" = "dig" ]; then
    dig +short MX "$name" 2>/dev/null | sed '/^$/d'
  else
    nslookup -type=MX "$name" 2>/dev/null | sed -n 's/^.*mail exchanger = //p'
  fi
}

have_line() { # have_line <needle> <text...> -> 0 if any line contains needle
  local needle="$1"; shift
  printf '%s\n' "$@" | grep -q "$needle"
}

FAILS=0
say() { printf '%-8s %s\n' "$1" "$2"; }

echo "== DNS auth check for: $DOMAIN (tool: $LOOKUP) =="

# --- SPF ---
SPF_LINES=$(txt "$DOMAIN")
SPF_REC=$(printf '%s\n' "$SPF_LINES" | grep -m1 '^v=spf1' || true)
if [ -n "$SPF_REC" ]; then
  NREC=$(printf '%s\n' "$SPF_LINES" | grep -c '^v=spf1' || true)
  if [ "${NREC:-0}" -gt 1 ]; then
    say "FAIL" "SPF: $NREC SPF records on $DOMAIN — merge into ONE record (receivers may treat multiples as none)"
    FAILS=$((FAILS+1))
  else
    say "PASS" "SPF found: $SPF_REC"
    printf '%s\n' "$SPF_REC" | grep -q 'all' || printf '%s\n' "$SPF_REC" | grep -q 'redirect=' || { say "WARN" "SPF has no 'all' mechanism — append ~all"; }
  fi
else
  say "FAIL" "SPF: no v=spf1 TXT record at $DOMAIN — add one (SETUP.md ch. 3.1)"
  FAILS=$((FAILS+1))
fi

# --- DKIM (optional selector) ---
if [ -n "$SELECTOR" ]; then
  DKIM_LINES=$(txt "${SELECTOR}._domainkey.${DOMAIN}")
  if [ -n "$DKIM_LINES" ]; then
    say "PASS" "DKIM: record found at ${SELECTOR}._domainkey.${DOMAIN}"
    say "NOTE" "DKIM only counts when enabled in your mail admin console (SETUP.md ch. 3.2)"
  else
    say "FAIL" "DKIM: nothing at ${SELECTOR}._domainkey.${DOMAIN} — publish the record from your admin console"
    FAILS=$((FAILS+1))
  fi
else
  say "SKIP" "DKIM: give a selector as 2nd arg to check (e.g. google, selector1, k1)"
fi

# --- DMARC ---
DMARC_LINES=$(txt "_dmarc.${DOMAIN}")
DMARC_REC=$(printf '%s\n' "$DMARC_LINES" | grep -m1 '^v=DMARC1' || true)
if [ -n "$DMARC_REC" ]; then
  say "PASS" "DMARC found: $DMARC_REC"
  printf '%s\n' "$DMARC_REC" | grep -q 'rua=' || { say "WARN" "DMARC has no rua= — you're flying blind; add rua=mailto:..."; }
  printf '%s\n' "$DMARC_REC" | grep -q 'p=none' || { say "NOTE" "DMARC policy is stricter than p=none — make sure your own mail passes before enforcing"; }
else
  say "FAIL" "DMARC: no v=DMARC1 TXT at _dmarc.${DOMAIN} — add one (SETUP.md ch. 3.3)"
  FAILS=$((FAILS+1))
fi

# --- MX ---
MX_LINES=$(mx "$DOMAIN")
if [ -n "$MX_LINES" ]; then
  say "PASS" "MX present ($(printf '%s\n' "$MX_LINES" | wc -l | tr -d ' ') record(s)) — needed to receive replies"
else
  say "FAIL" "MX: none on $DOMAIN — replies to your cold email will bounce"
  FAILS=$((FAILS+1))
fi

echo "== done: $( [ "$FAILS" -eq 0 ] && echo 'no hard failures (review PASS/WARN lines above)' || echo "$FAILS hard failure(s) — fix SETUP.md ch.3 records and re-run" ) =="
exit 0
