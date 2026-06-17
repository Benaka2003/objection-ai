export const demoScenarios = [
  {
    id: 'demo-1',
    label: '💰 Price Objection',
    objection: 'Your pricing is way too high for us right now.',
    category: 'price',
    emotionalRoot: 'Fear of overpaying or exceeding budget',
    responses: [
      {
        style: 'empathetic',
        response:
          "I completely understand — budget pressure is real and I'd never want to push something that doesn't make sense financially. Can I ask what your current budget looks like? We have flexible plans and I want to find something that works for you.",
      },
      {
        style: 'logical',
        response:
          "When our clients calculate the 12-month ROI, they typically recover the investment within the first 90 days through deals that would have otherwise been lost to objections. Would it help to walk through what that looks like for your deal size?",
      },
      {
        style: 'assertive',
        response:
          "Every single client who told me it was too expensive is now our loudest advocate. The cost of losing one deal to a handled objection is higher than our annual plan. When can we set up a 20-minute ROI call?",
      },
    ],
  },
  {
    id: 'demo-2',
    label: '⏰ Timing Objection',
    objection: "This isn't the right time. Come back next quarter.",
    category: 'timing',
    emotionalRoot: 'Fear of commitment or organisational unreadiness',
    responses: [
      {
        style: 'empathetic',
        response:
          "That makes total sense — timing is everything and I respect that you know your business cycles. Can I ask what specifically would need to change next quarter for this to feel right?",
      },
      {
        style: 'logical',
        response:
          "The interesting thing is that companies who implement during slower periods see 3x faster adoption because their teams actually have time to onboard properly. Next quarter you'll be in the same position but 90 days behind your competitors.",
      },
      {
        style: 'assertive',
        response:
          "With respect, 'next quarter' has a way of becoming 'next year'. Your competitors aren't waiting. What would need to be true for us to start a pilot this month instead?",
      },
    ],
  },
  {
    id: 'demo-3',
    label: '⚔️ Competition Objection',
    objection: "We already use Salesforce and we're happy with it.",
    category: 'competition',
    emotionalRoot: 'Fear of switching cost or disruption',
    responses: [
      {
        style: 'empathetic',
        response:
          "That's great — Salesforce is a solid platform and it makes complete sense to be loyal to something that's working. I'm not here to replace it. Can I show you how we sit on top of your existing setup and handle the one thing Salesforce doesn't?",
      },
      {
        style: 'logical',
        response:
          "Most of our best customers came from Salesforce. They kept it for CRM and use us specifically for objection intelligence — it's a 15-minute integration and adds a layer Salesforce simply doesn't have. Would a quick technical walkthrough be useful?",
      },
      {
        style: 'assertive',
        response:
          "Salesforce is a great system of record. We're a system of winning. They don't compete — and I can prove it in 10 minutes. When's your next sales team standup?",
      },
    ],
  },
  {
    id: 'demo-4',
    label: '🤝 Trust Objection',
    objection: "I've never heard of you. How do I know this actually works?",
    category: 'trust',
    emotionalRoot: 'Scepticism about claims or risk of failure',
    responses: [
      {
        style: 'empathetic',
        response:
          "That's a completely fair question and honestly the right one to ask. You shouldn't trust a tool you haven't seen work. Would it help if I connected you with two customers in your industry who were in exactly the same position six months ago?",
      },
      {
        style: 'logical',
        response:
          "Fair enough — we're relatively new but our results aren't. Our average customer sees a 22% improvement in objection-to-close rate within the first 60 days. We back that with a 30-day money-back guarantee so there's zero risk.",
      },
      {
        style: 'assertive',
        response:
          "I'd rather you be sceptical now than disappointed later. Let's do this: a 14-day free trial, your real data, your real objections. If you don't see measurable improvement, walk away. Deal?",
      },
    ],
  },
  {
    id: 'demo-5',
    label: '👤 Authority Objection',
    objection: 'I need to check with my manager before making any decisions.',
    category: 'authority',
    emotionalRoot: 'Lack of decision-making power or internal politics',
    responses: [
      {
        style: 'empathetic',
        response:
          "Absolutely — that's the right process and I wouldn't expect anything less. To make that conversation easier for you, can I put together a one-pager with the key numbers and ROI breakdown that you can share with them directly?",
      },
      {
        style: 'logical',
        response:
          "Of course. To help that conversation go smoothly, it would help me to know — what does your manager typically prioritise when evaluating a tool like this? I can make sure the summary I send addresses exactly that.",
      },
      {
        style: 'assertive',
        response:
          "Completely understand. Let's do this efficiently — can we set up a 20-minute call with you and your manager together this week? That way all questions get answered in one shot and you're not playing telephone.",
      },
    ],
  },
];