# New Client Intake Questionnaire

**Step 1 of the loop — CAPTURE.** Send this after the client says yes, before
the kickoff call. Tell them: "It takes about 15 minutes, and everything you
put here makes the kickoff call twice as useful."

How to use it:
- Send it as a form, a doc, or a plain email — the questions matter more than
  the container.
- Mark each answer green / amber / red as it comes in (the rule is at the
  bottom).
- Log what came back in `intake-response-log.csv` so the kickoff call starts
  from facts, not memory.

Worked example lines show how **Fieldnote Studio** captured answers from
**Copperline Coffee Roasters** (fictional).

---

## A. Business context (7 questions)

1. Describe your business in two sentences — what you sell and to whom.
   - *Copperline: "Small-batch specialty coffee roaster; we sell whole-bean
     bags and subscriptions to home brewers and 14 wholesale cafés."*
2. Who are your main customer types, and roughly what share does each bring?
3. What are your three most important products or services right now?
4. Who are your top three competitors?
5. What does your business do differently from them, in your own words?
6. Where do most of your customers come from today?
7. What seasonality or deadlines should we know about (launches, holidays,
   busy seasons)?
   - *Copperline: "Holiday gifting is Nov 15–Dec 20 — biggest weeks of the
     year."*

## B. Goals & success (7 questions)

8. What made you decide to start this project now?
9. If this project goes well, what changes for your business in 6 months?
10. What is the single most important outcome for you? Pick one: more sales /
    better image / fewer manual tasks / reaching a new audience / other: ___
    - *Copperline: "More online subscription sales."*
11. How will you personally judge whether the project worked?
12. Are there internal stakeholders who must approve the work? Who?
    - *Copperline: "Me and my wholesale manager, Riley."*
13. What has been tried before for this problem? What happened?
14. What would make this project a disappointment?

## C. Brand & audience (7 questions)

15. Describe your brand in three words.
16. Are there brands (any industry) whose look or voice you admire?
17. Are there styles you actively dislike?
18. Who is your single most important customer type? Describe them like a
    person (age, habits, what they care about).
19. Do you have brand guidelines? If yes, where do they live?
    - *Copperline: "A one-page PDF from 2023 — sharing it."*
20. Do you have a logo in original formats (vector)? Where?
21. Anything about your brand that must be kept exactly as it is?

## D. Content & assets (7 questions)

22. Which existing materials should we work from (photos, copy, menus, product
    lists)? List them.
23. Who writes the final words on the project — you, us, or someone else?
24. Do you have rights-cleared photos, or do we need to plan photography?
    - *Copperline: "Around 60 product/lifestyle photos from a 2024 shoot."*
25. Where do your current assets live (Drive, email threads, an old laptop)?
26. Are there legal or regulatory constraints on how your products are
    presented (claims, labels, age restrictions)? If unsure, list what your
    industry usually flags. *(We process this operationally — your compliance
    advisor makes the final call.)*
27. List every account/platform the project will touch (website host, domain,
    email tool, social, analytics).
    - *Copperline: "Shopify store, Cloudflare domain, Mailchimp, Instagram."*
28. Is there content that must go live on day one (a launch page, a menu, a
    product list)?

## E. Technical access (7 questions)

29. Who currently controls the domain and hosting, and how do we reach them?
30. Who owns the analytics and email accounts we will need?
31. Can you create accounts/invites, or does someone else (IT, a former
    contractor) have to do it?
32. Are there two-factor or admin approvals we should plan around?
    - *Copperline: "Shopify admin is my old developer; he is responsive."*
33. Do any systems need to talk to each other (store → email list, site →
    inventory)? List the pairs.
34. Anything about your current setup you suspect is fragile?
    - *Copperline: "The wholesale price list is a spreadsheet only Riley can
     edit."*
35. If the site went down tomorrow, who is the person who fixes it?

## F. Risks & constraints (7 questions)

36. What is the hard deadline, and what happens if it slips?
    - *Copperline: "Soft launch before Nov 1 — wholesale season."*
37. What is the budget range for this project, and is any part of it fixed?
38. Who signs off on each stage of work?
39. What past experience with providers went badly? What happened?
    - *Copperline: "Previous dev went quiet for 3 weeks mid-project."*
40. Are there decisions that must wait for a partner/board/family member?
41. What is your preferred way to be contacted for day-to-day questions, and
    where should we NOT contact you?
42. Anything else you want us to know that we did not ask?

---

## The traffic-light rule (do this as answers arrive)

Mark every answer as you read it:

- **GREEN** — clear, usable, matches what was sold. Proceed.
- **AMBER** — vague or contradictory. Ask one clarifying question before the
  kickoff call and log the answer.
- **RED** — a blocker hiding in plain sight. Raise it at the kickoff call,
  directly, as an agenda item.

### Red-flag answers (examples from the worked example)

| Answer pattern | Why it is red | Where it resurfaces |
|---|---|---|
| "We can also just..." expanding the project beyond what was sold | scope growing before it is written down | scope worksheet, `out-of-scope` column |
| No single person can approve work | approvals become a moving target | kickoff agenda item: decision-makers |
| Third party controls critical access and their availability is unknown | week-one stall | access checklist, contacts column |
| A deadline tied to an external event | the schedule has a hard edge | milestone plan |
| "The last provider went quiet" | they are watching your responsiveness — cadence matters from day one | communication cadence playbook |

*Worked example: Fieldnote logged two reds for Copperline — the Shopify admin
dependency (question 32) and the Nov 1 soft-launch edge (question 36). Both
became kickoff agenda items, and both were resolved in the call.*

## After the questionnaire

1. Log every answer in `intake-response-log.csv` (one row per question that
   produced a decision, an asset, or an access item).
2. Turn reds into kickoff agenda items.
3. Turn greens into the raw material for the scope worksheet (step ALIGN).
