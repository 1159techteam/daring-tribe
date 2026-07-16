export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryId: string;
  title: string;
  author: string;
  date: string;
  /** ISO datetime — post is hidden until this moment. Omit = already live. */
  publishedAt?: string;
  image: string;
  excerpt: string;
  content: string;
}

export const CATEGORIES = [
  { id: "all", name: "All Categories", description: "" },
  {
    id: "salesbook",
    name: "The Daring Salesbook",
    description:
      "Sales frameworks, prospecting strategies, objection handling, personal branding for realtors and lessons from our bootcamp/training sessions.",
  },
  {
    id: "community",
    name: "Community Hub",
    description:
      "Realtor journeys & testimonials, student transformation stories, before/after growth narratives.",
  },
  {
    id: "insights",
    name: "Real Estate Insights",
    description:
      "Real estate fundamentals, definitions & explanations — a go-to learning hub of what real estate is all about.",
  },
  {
    id: "daring",
    name: "What's Daring?",
    description:
      "Announcement hub for Daring Tribe including bootcamps, trainings, hangouts, and Daring Tribe closers for the month.",
  },
];

export const BLOG_DATA: BlogPost[] = [
  // JANUARY
  {
    id: "01",
    slug: "your-daring-corner-of-the-internet",
    categoryId: "daring",
    category: "What's Daring?",
    title: "Your Daring Corner of the Internet",
    author: "Opemipo Akingbade",
    date: "JANUARY 2026",
    image: "/tribe-action.jpg",
    excerpt:
      "Hey there! You found us! If you're here, then you're daring to be the better version of yourself.",
    content: `Hey there! You found us!
If you're here, then you're daring to be the better version of yourself.

You're probably here because you want to learn real estate properly, figure out sales as you go or get exposed to opportunities that can champion your next level.

So here we are. Welcome to the Daring Tribe website!
It's a whole experience of learning, earning and winning.

**So… What Now?**

Join the tribe.
- Explore
- Read
- Bookmark
- Come back

Signed, your daring corner of the internet.`,
  },
  {
    id: "02",
    slug: "inside-the-daring-tribe-salesbook",
    categoryId: "daring",
    category: "What's Daring?",
    title: "YOUR NEXT BIG SALE",
    author: "",
    date: "JANUARY 2026",
    image: "/cisca1.png",
    excerpt:
      "Realtors, listen up something exciting has just arrived in Agbowo, Ibadan, and it’s the kind of project you’ll want to show every client. Cisca Villa isn’t just another apartment complex,   it’s a bold statement in modern living and smart investment for young professionals. From design to location, this estate is built to sell itself but you’ll need to guide clients to see why it’s a move they can’t miss.",
    content: `

**Sell the Experience, Not Just the Apartment**

Cisca Villa isn’t your typical estate. Think fully furnished room-and-parlour apartments that combine comfort, style, and practicality. Every detail is intentional rooftop gardens for relaxation, heat extraction ventilation systems for comfort, solar-powered energy for stability, biometric fingerprint access for security, CCTV monitoring, and 24/7 water supply.

When showing clients, emphasize this: it’s a complete living experience, not just four walls. Young professionals want more than a place to sleep they want a home that reflects their lifestyle, their ambition, and their taste. This is where you can position Cisca Villa as a must-have for modern living.

 

**LOCATION SELLS ITSELF**

Location is everything, and Cisca Villa nails it. Agbowo, Ibadan is vibrant, accessible, and close to universities, business hubs, and everyday conveniences. For young professionals, this is huge: short commutes, easy access to social spots, and a thriving community.

When pitching, highlight how this estate balances privacy, connectivity, and lifestyle. Investors will immediately recognize the long-term value because location drives both rental income and property appreciation.

 

**POSITIONING IT AS A SMART INVESTMENT**

Here’s where you close the deal: Cisca Villa isn’t just about luxury living it’s about earning while owning. Apartments here are built to grow in value and generate yearly returns for young professionals. Whether they rent it out or live in it, they’re making a financial move that pays off.

You can say: “Invest in an apartment today, and it earns for you tomorrow. Passive income while your property appreciates. Comfort, convenience, and long-term growth   all in one place.”

Realtors, this is your angle: sell opportunity, wealth-building, and security, not just the apartment. Cisca Villa is made for the new generation of investors who understand that real estate is more than accommodation it’s a pathway to financial freedom.

Guide your clients through this story, and watch how quickly they see the value. Agbowo is about to feel the difference, and your clients’ bank accounts will too.`,
  },
  {
    id: "03",
    slug: "inside-the-daring-tribe-salesbook",
    categoryId: "salesbook",
    category: "The Daring Salesbook",
    title: "Inside the Daring Tribe Salesbook",
    author: "Sinmiloluwa Oyemakinde",
    date: "JANUARY 2026",
    image: "/modern-luxury-office-interior-with-floor-to-ceilin.jpg",
    excerpt:
      "Sales is often misunderstood. At the Daring Tribe, we see sales differently. Sales is a skill. A process. And most importantly, a transfer of value.",
    content: `Sales is often misunderstood.
  Some people think it's about convincing people to buy things they don't need.
  A few think it's talent, you either have it or you don't.
  At the Daring Tribe, we see sales differently.

  Sales is a skill.
  A process.
  And most importantly, a transfer of value.

  That belief is the very foundation of the Daring Salesbook, learning about our strategies and what sets us apart as Daring.

  **First Things First: We Sell Value, Not Noise**

  If you don't understand the value of what you're selling, you can't sell it confidently.
  Our estates are not positioned as "just land" or "mere listings"

  They are:
  - Solutions to real housing needs
  - Assets with long-term relevance
  - Developments backed by clear purpose and structure

  That's why our sales approach starts with understanding the product deeply and the value we have to offer.

  **Grab Your Salesbook, Training is in Session..**

  We provide training that prepares you for real world conversations built around actual field experience and ultimately how to convert conversations into decisions.

  Our approach provides you the power of selling built with structure, and there's only one way to find out..

  Be a part of the tribe, and enjoy much more from the daring salesbook.`,
  },
  // FEBRUARY
  {
    id: "04",
    slug: "realtors-guide-to-identifying-land-size",
    categoryId: "insights",
    category: "Real Estate Insights",
    title: "A Realtor's Guide to Identifying Land Size Without Guesswork",
    author: "Janet Oladokun",
    date: "FEBRUARY 2026",
    image: "/property-detail.jpg",
    excerpt:
      "Have you ever been in that situation where you're on a site inspection, the client turns to you and asks: 'So… how big is this land?' And for a split second, your mind goes blank.",
    content: `Have you ever been in that situation where you're on a site inspection, the client turns to you and asks: "So… how big is this land?"
  And for a split second, your mind goes blank.

  If you're wondering how this scenario ends, then stick around.

  Land size confusion is one of the most common moments realtors and clients face which is one of the quickest ways to lose confidence if not handled properly.

  This isn't about looking experienced.
  It's about being accurate.

  **First: Why Land Size Matters**

  Land size affects the price of the property, what they can build, the long-term value and resale potentials; and it starts from understanding the basics of land sizes properly.

  **Understanding the Basics (Properly This Time)**

  Land size is measured in square metres (sqm) which is the global standard.
  In Nigeria, what people casually call "a plot" is not universal.

  Depending on different locations, a "plot" could be:
  - 450 sqm
  - 500 sqm
  - 600 sqm

  That's why relying on the word plot alone is risky.

  **The Most Common Land Sizes You'll Encounter**

  Here's what you should know offhand:
  - 300 sqm: Often considered half-plot in many estates
  - 450–500 sqm: Common residential size
  - 600 sqm: Traditional "full plot" in some locations
  - 1,000+ sqm: Large residential or semi-commercial

  Knowing these numbers helps you visualize space, explain the differences and buyers are matched to the right option.

  **So… Can You Actually Tell Land Size Just by Looking?**

  Short answer: Yes, approximately.
  And no, it's not magic.

  Let's paint some common scenarios.

  **What Can Comfortably Fit on Common Land Sizes in Nigeria**

  Think of this as a mental reference chart you carry with you.

  **150 sqm**
  Best for: Compact studio apartment, Mini 1-bedroom unit, Small shop / kiosk (commercial zones)
  This size is about function and not flexibility.

  **250 sqm**
  Best for: Comfortable 2-bedroom bungalow, Small carefully planned 3-bedroom bungalow
  You build here with intention, and not excess.

  **300 sqm**
  Best for: Standard 3-bedroom bungalow, Carefully planned Compact duplex, usually popular in estates and has room for basic parking and setbacks

  **450 sqm**
  Best for: Standard duplex, Spacious 3–4 bedroom bungalow and Small block of flats (2–3 units, depending on layout)
  This is the sweet spot for many buyers.

  In the final analysis, instead of guessing, think:
  - What category does this land fall into?
  - What fits comfortably, not forcefully?
  - Does the survey confirm this size?

  That's how you start figuring out land sizes, one property at a time.`,
  },
  // APRIL BLOGS

  {
    id: "09",
    slug: "real-estate-101-before-you-call-yourself-a-realtor",
    categoryId: "insights",
    category: "Real Estate Insight",
    title: "Real Estate 101: Before You Call Yourself a Realtor… Read This",
    author: "Oladokun Janet",
    date: "APRIL 2026",
    image: "/prospecting.png",
    excerpt:
      "Let’s be honest… Some of you want to sell property but if a client asks you one or two questions… you begin to stammer.",
    content: `Let’s be honest… Some of you want to sell property but if a client asks you one or two questions… you begin to stammer. Relax, this is a safe space. If you’ve done the Daring Tribe crash course, this is your “oh yes” moment. If you haven’t… just read quietly and pretend you have.

So what exactly is real estate? No big grammar. Real estate is simply: Land + anything standing on it. That’s it. House? Real estate. Shop? Real estate. But as a Daring Realtor, it’s deeper than that. This thing we’re selling? It's an opportunity. It’s money. It’s future soft life.

Now let’s break it down.

Everything you’ll ever sell falls into 4 categories:

Residential – Where people live (your clients that want “something calm and standard”).
Commercial – Where money is made (shops, offices… where business happens).
Industrial – Serious business zones (factories, warehouses… not your everyday client).
Land – The OG investment (the one people will say “I’ll buy later” until price doubles).

Let’s not lie… There’s a difference between: “I sell property” and “I know what I’m doing.”

When you understand this thing well:
• You stop sounding unsure
• Clients start taking you seriously
• You explain things without checking Google mid-conversation
• And most importantly… you CLOSE DEALS

This market is full of “realtors,” but not all of them actually understand what they’re selling. Don’t be that person.

Be the one that:
Knows.
Explains.
Confidently collects payment.

Stop just posting flyers. Stop copying captions. Know your product.

Because the moment you understand it well… you won’t need to convince clients. They’ll convince themselves.`,
  },

  {
    id: "10",
    slug: "prospecting-doesnt-have-to-suck",
    categoryId: "salesbook",
    category: "The daring sales book",
    title: "Prospecting Doesn’t Have to Suck: Here’s How",
    author: "Favour Abiodun",
    date: "APRIL 2026",
    image: "/deal-closers.png",
    excerpt:
      "You’ve probably heard this a million times if you are a realtor: “Prospecting is hard.”",
    content: `You’ve probably heard this a million times if you are a realtor: “Prospecting is hard.” “I don’t know what to say.” “Clients don’t reply anyway.” Sound familiar?

Let me tell you something… prospecting doesn’t have to suck. In fact, if done right, it can become the easiest part of your day—the part where clients actually come to you instead of you chasing them.

Let’s be honest, most people treat prospecting like punishment. You scroll endlessly through social media, shoot messages, hope someone responds… and nothing. Then frustration hits.

Prospecting fails when it’s inconsistent or aimless. Showing up once in a while won’t cut it. But show up daily, with a system, and you start to see magic happen.

Step 1: Grab Attention First

Before you can sell, you need to be seen. Stop being just another name in someone’s DM list or social media feed.
• Share tips your audience actually cares about  
• Drop mini “how-to” guides in short posts  
• Share success stories of clients (without bragging, just proof)  

The goal? Make them notice you, not just your listing.

Step 2: Show Value, Not Just Features

People don’t buy houses. They buy how the house will make their life better.

Instead of saying: “This apartment has 3 bedrooms and 2 bathrooms.”
Try: “Imagine waking up in your own 3-bedroom space with sunlight pouring in every morning… and knowing it’s officially yours.”

See the difference? You’re not just selling a building, you're selling a dream they can picture.

Step 3: Consistency is Everything

Prospecting isn’t a one-time thing. It’s like exercising—the results come with habit.
• Post consistently on social media  
• Follow up with potential clients daily/weekly  
• Keep your network updated on new opportunities  

Even if it feels like nothing is happening, trust me: the people you touch now will remember you later.

Step 4: Follow Up Like a Pro

Here’s the ugly truth: most deals are lost not because clients aren’t interested, but because realtors stop following up too soon.

Follow-ups don’t have to be awkward. A simple:
“Hey, just checking in to see if you had any questions about the property we discussed.”
…goes a long way.

Polite, consistent, and respectful = results.

Do this, and suddenly… deals aren’t a game of luck. They’re predictable, repeatable, and yours for the taking.`,
  },

  {
    id: "11",
    slug: "this-is-what-daring-looks-like-q1-deal-closers",
    categoryId: "daring",
    category: "What’s Daring?",
    title: "This Is What Daring Looks Like ft Q1 deal closers",
    author: "Balogun Mutmainnah, Christian Kuyet Martha, Samuel Deborah",
    date: "APRIL 2026",
    image: "/prospecting1.png",
    excerpt:
      "What does it truly mean to be daring in today’s real estate space?",
    content: `What does it truly mean to be daring in today’s real estate space?

Is it about taking risks, showing up daily, or pushing forward even when results aren’t immediate?

In Q1, a few standout realtors didn’t just set goals—they went after them with intention, resilience, and bold action. From hosting their first webinars to converting skeptical prospects into paying clients, these individuals embodied what it means to step out of comfort zones and win.

This feature highlights real stories from our Q1 deal closers—individuals who chose consistency over excuses, courage over fear, and action over doubt. Who knows? Your story might be next.

Straight from the desk of Balogun Mutmainnah, the Real Estate Queen and one of our top Q1 closers:

1. What was your biggest driving force to close deals in Q1?

I created a target to close 10 deals for Evergreen Farms Phase 1. Creating my own target is one of the reasons why I always showed up every day until I made my first sale.

2. What specific action helped you convert a prospect into a paying client (e.g., follow-ups, content, referrals, etc.)?

I created my own strategy, which is educating people. I like to educate people on things I know, and that is why I created my first webinar for undergraduates.

3. Can you briefly walk us through one deal you successfully closed?

It wasn't easy, but with the support of my coach and the community lead, Miss Opemipo (DRealtor) at the Daring Tribe group, I was able to organize my first webinar. She was my first speaker and one of the first people who welcomed and encouraged me in the group. She supported me a lot—teaching me how to prospect, how to reply to clients, and motivating me to keep showing up.

A well-deserved story from the top-selling triber in Q1: Christian Kuyet Martha

1. What was the most daring move you took that paid off?

The most daring move I took was securing my first plot of land even when my bank account was telling me not to. This became a strong point of sale for me.

2. What challenge did you face, and how did you overcome it?

One challenge I faced was clients hesitating to make payment despite showing interest. I overcame this by creating urgency—letting them know that the land was limited and could be sold out if they delayed payment.

3. What one piece of advice would you give realtors looking to close deals in Q2?

Focus on consistent follow-ups and educating clients. Many deals are not closed because realtors stop following up too early. Most clients need time, information, and trust before making payment.

Featuring Samuel Deborah, a Q1 deal closer:

1. What specific action helped you convert a prospect into a paying client?

Consistent follow-ups and helping clients see the value of the property played a major role. I stayed in touch with prospects, provided relevant property options, and answered their questions promptly, which helped build trust and confidence.

2. Can you briefly walk us through one deal you successfully closed?

I engaged a prospect who was initially undecided. I took time to understand their needs, and Baj Court turned out to be the best option. I showed them suitable options and maintained consistent communication.

I helped the client see the future value—that the property was close to a school and had strong potential. Although the client was concerned about the cost, I helped them focus on the long-term benefits, and after a few days, I closed the deal.

3. What was the most daring move you took that paid off?

The most daring move I took was reaching out persistently to a cold lead who initially showed little interest. Through consistent follow-ups and providing value, the lead eventually converted into a paying client.

4. What one piece of advice would you give realtors looking to close deals in Q2?

Stay consistent and don’t give up on follow-ups. Many deals are closed through persistence, proper communication, and building genuine relationships with clients.

As we step into Q2, let these stories challenge you to do more, be more, and push beyond your limits. Set your targets, refine your strategies, and most importantly, stay committed to the process.

Your next closed deal could be one decision, one follow-up, or one bold move away.

So the question is… what daring step will you take next?`,
  },

  // MAY BLOGS

  {
    id: "12",
    slug: "from-shaky-hands-to-signed-deals",
    categoryId: "community",
    category: "Community Hub",
    title:
      "From Shaky Hands to Signed Deals: A Realtor’s Journey from Fear to Confidence",
    author: "Opemipo Akingbade",
    date: "MAY 2026",
    image: "/may01.jpeg",
    excerpt:
      "I remember my early days in real estate so clearly. There was one particular morning I had a lead to call.",
    content: `I remember my early days in real estate so clearly. There was one particular morning I had a lead to call. Nothing serious, just a simple follow-up. But I sat there, phone in hand, staring at the number like it was something bigger than it actually was.

My heart was racing. I kept overthinking what to say. And honestly… I almost didn’t call. It sounds small, but if you’re a realtor, you understand. That moment? It’s real.

When I started, I thought the biggest challenge would be learning the business, understanding properties, pricing, documents, all of that. But no one really prepares you for the internal battles. The fear of sounding unprofessional. The fear of rejection. The fear that maybe… you’re not as ready as you thought.

Every time a client said “I’ll think about it,” I took it personally. Every “no” felt like I wasn’t good enough. And every delay made me question myself. There were days I genuinely wondered if I chose the right path.

At some point, I had to be honest with myself. I realized something: If I kept waiting to feel confident, I might never move. So I made a decision — I would act, even if I was still scared.

I started small. Every morning, I took time to go over my listings properly. I studied the market, practiced how I would talk to clients, and tried to sound more natural — not perfect, just better than yesterday. Then I started making the calls anyway. Not perfectly. Not confidently at first. But consistently.

One thing that really changed my approach was this: I stopped focusing on “what if they reject me?” and started focusing on “how can I help this person?”

That shift made everything easier. I listened more. I paid attention to what clients actually needed. I stopped trying to impress and started trying to understand. And slowly… conversations started to feel different.

I won’t lie, growth took time. There were still awkward calls. Still moments I doubted myself. Still deals that didn’t go through. But there were also small wins. A call that went smoothly. A client that trusted my opinion. A meeting where I didn’t feel nervous for once.

And then, one day, I closed a deal that reminded me why I started. That moment meant everything to me. Not just because of the deal, but because I knew how far I had come.

Today, I won’t say I’m fearless. But I’m definitely more confident. Not because fear disappeared, but because I’ve learned how to move in spite of it. Now, I pick up calls without overthinking. I speak with more clarity. I trust what I know. And the same things that once scared me… are now part of my everyday work.

If you’re in real estate and you’ve ever felt scared, unsure, or not “ready enough” — I get it. I’ve been there.

But here’s what I’ve learned: Confidence doesn’t come before action. It comes because of action.

You don’t need to have it all figured out. You just need to start. One call. One meeting. One step at a time.

Real estate has taught me more than just how to sell properties. It has taught me how to grow as a person. How to manage my mindset. How to handle pressure. How to show up even when I don’t feel 100% ready.

And honestly, that’s where the real success starts.

Fear is real — I won’t pretend it’s not.

But so is growth. So is progress. And so is the version of you that becomes better because you didn’t give up.

I’m still growing. Still learning. Still pushing myself. But one thing I know for sure is this: I’m no longer the person who was too scared to make that call.

And if I could get past that… You can too.`,
  },

  {
    id: "13",
    slug: "i-almost-ignored-this-house-until-it-turned-into-a-smart-deal",
    categoryId: "insights",
    category: "Real Estate Insights",
    title: "I Almost Ignored This House… Until It Turned Into a Smart Deal",
    author: "Adeola Olowolayemo",
    date: "MAY 2026",
    image: "/may02.jpeg",
    excerpt:
      "Let me tell you something funny… the first time I saw that property, I was not impressed at all.",
    content: `Let me tell you something funny… the first time I saw that property, I was not impressed at all.

It didn’t have that “wow” factor. No fancy finishing, no dramatic entrance, nothing that would make you instantly fall in love. Just a regular house sitting quietly like it had nothing to offer.

And my client? Already unconvinced.

“Are you sure this is worth it?” they asked.

Honestly, I understood them. Because at first glance, it really didn’t look like much.

But I’ve learned something in real estate: if you judge a property too quickly, you might miss money without even realizing it. So instead of brushing it off, I decided to look deeper.

I went back, this time with intention. I paid attention to things I didn’t notice the first time. I checked what similar properties in that area were going for. I looked at how accessible the location was. I started asking questions about the neighborhood, the development around it, and what the future could look like there.

And that’s when everything changed.

That “ordinary” house was actually sitting in a location that was quietly growing. The kind of place people overlook today… and rush into tomorrow when prices have doubled.

Suddenly, it wasn’t just a house anymore. It had potential.

Now the real work started — not convincing myself, but helping my client see what I was seeing.

Because let’s be honest, clients don’t care about your research sheets or how long you spent analyzing data. They care about what it means for them.

So when I spoke to them again, I didn’t start listing features like I was reading from a script. I didn’t say, “It has three bedrooms and a nice kitchen.” Please, that one won’t move anybody 😭

Instead, I told a story.

I showed them what the property could become. I helped them see how the value could grow over time, how it could fit into their plans, and even how it could make them money if they decided to rent it out later.

And just like that, the energy shifted.

The same client that was unsure started asking better questions. Curious questions. Interesting questions.

Before I knew it, we had moved from hesitation… to decision.

That was one of the moments that really taught me what evaluating a property actually means.

It’s not just about looking at a building and stating the obvious. Anybody can do that.

It’s about seeing what’s not immediately visible. It’s about understanding value beyond the surface and translating that in a way your client understands and believes.

Because the truth is, every property has a story. Some are just louder than others.

And as a realtor, your job is to bring that story to life.

The more I grew in this business, the more I realized that this skill is what separates an average realtor from a smart one. When you can walk into a space, understand its value, and communicate that value with confidence, people start to trust you differently.

You’re no longer just showing houses. You’re guiding decisions.

And that changes everything.

So now, whenever I walk into a property that looks “just okay,” I don’t rush to judge it. I pause. I observe. I ask questions. Because I know there’s always more than meets the eye.

And more often than not, that’s where the real opportunity is hiding.

At the end of the day, evaluating a property like a pro isn’t about being perfect or knowing everything. It’s about being curious enough to look deeper, smart enough to connect the dots, and confident enough to help someone else see what you see.

Because sometimes, the house that doesn’t impress you at first glance…is the one that ends up making the smartest deal.`,
  },

  // JUNE BLOGS

  {
    id: "14",
    slug: "closing-deals-through-trust-relationships-and-consistency",
    categoryId: "daring",
    category: "What’s Daring?",
    title: "Closing Deals Through Trust, Relationships, and Consistency",
    author: "Adeola Olowolayemo",
    date: "JUNE 2026",
    image: "/ade.png",
    excerpt:
      "In this edition of our Deal Closer Spotlight, we feature Miss Adeola Olowolayemo, one of our outstanding Q2 performers whose success story demonstrates the power of relationship building, trust, and consistency in real estate sales.",
    content: `In this edition of our Deal Closer Spotlight, we feature Miss Adeola Olowolayemo, one of our outstanding Q2 performers whose success story demonstrates the power of relationship building, trust, and consistency in real estate sales. She shares valuable insights into how she successfully converted a prospect into a client and the lessons she learned throughout the process.

**1. What do you think helped you close this sale?**

One of the biggest factors that contributed to closing this deal was building and maintaining a strong relationship with the client. By consistently engaging with him and nurturing the relationship over time, trust was established long before the final decision to invest was made.

**2. Was there anything you did that convinced the client to buy?**

The client’s confidence was largely influenced by the company’s reputation for integrity and excellence. Through proper due diligence, transparent communication, and complete documentation, the client was assured that he was dealing with a trustworthy company that consistently delivers on its promises.

**3. Did the client have any concerns before buying? How did you handle them?**

Yes. The client was concerned about the quality of finishing and whether the project would be delivered to the expected standard. These concerns were addressed by showcasing the company’s previous developments, particularly Dias Crest. Seeing the quality of completed projects gave the client the confidence that the same standard would be maintained.

**4. What part of the process helped the most in closing the deal?**

Several factors played a significant role in the successful close. God’s grace was instrumental throughout the process. Additionally, the company’s strong integrity, the support and leadership of Miss Comfort, and the well-structured systems already in place for the project all helped build the client’s confidence and contributed to the successful outcome.

**5. What advice would you give someone trying to make more sales?**

Don’t give up. Stay consistent, keep following up, and remain committed to the process. Every interaction with a prospect is an opportunity, and your next deal may be much closer than you think. This is a principle I constantly remind myself of as well.

This success story reinforces an important lesson in real estate sales: people buy from those they trust. Building genuine relationships, maintaining integrity, and consistently showing up for your clients can make all the difference between a prospect and a closed deal.`,
  },

  {
    id: "15",
    slug: "i-used-to-struggle-with-sales-calls-but-now-that-has-completely-changed",
    categoryId: "salesbook",
    category: "The Daring Salesbook",
    title:
      "I Used to Struggle With Sales Calls But Now That Has Completely Changed",
    author: "Emerald Akinjayeju",
    date: "JUNE 2026",
    image: "/june02.png",
    excerpt:
      "In real estate, every client interaction is a potential turning point. One conversation can be the difference between losing a lead and closing a deal worth millions.",
    content: `In real estate, every client interaction is a potential turning point. One conversation can be the difference between losing a lead and closing a deal worth millions. Yet many realtors, especially those just starting out, often find themselves unsure of how to properly guide conversations toward a successful close.

This is where sales frameworks become important. They are not scripts. They are structured, step-by-step approaches that give conversations direction, confidence, and consistency.

A young realtor like Ada experienced this early in her career. She had plenty of leads, but her results were inconsistent. Conversations would start well, introductions were smooth, and small talk flowed easily. However, somewhere along the line, momentum would drop. Clients would hesitate, objections would come up, and deals would not move forward.

The issue was not lack of effort or knowledge, but lack of structure. Once she adopted a clear sales framework, her results changed significantly.

**Preparation: The Foundation of Every Successful Call**

Preparation is the foundation of every successful client call. Entering a conversation without understanding the client or the property creates uncertainty. Ada began researching her leads properly, understanding their goals, background, and possible concerns. She also studied each property carefully, identifying key features, benefits, and selling points.

With this level of preparation, she no longer approached calls with anxiety. Instead, she had clarity. She could anticipate questions, communicate confidently, and present information with authority. Preparation is not only about knowledge, but also about mindset. When a realtor is well-prepared, clients naturally trust their credibility.

**Discovery: Listen Before You Present**

The next important step is discovery, which focuses on listening before presenting. Many realtors make the mistake of pitching too early. However, effective communication begins with understanding the client first. Ada started asking intentional questions that revealed her clients’ real needs, whether they were focused on long-term investment, rental income, family safety, or lifestyle preferences.

These insights helped her shift from generic presentations to personalized conversations. Clients felt heard and understood, which made them more open and engaged. Discovery turns a simple sales call into a meaningful conversation where the client feels guided rather than sold to.

**Value Presentation: Benefits Over Features**

After understanding the client’s needs, the next step is value presentation. At this stage, the focus is not on listing features but on communicating benefits. Ada learned to translate property details into real-life value. Instead of simply describing rooms or square footage, she helped clients visualize the experience — how a balcony could become a peaceful morning space, how a living room could support family moments, or how energy-efficient features could reduce long-term costs.

This approach made properties feel more relevant and desirable. A property is not just a structure; it represents opportunity, comfort, and investment potential when properly presented.

**Objection Handling: Turn Concerns Into Confidence**

Objection handling is another critical part of the process. Concerns about price, location, or timing are natural in real estate conversations. Instead of reacting with pressure or defensiveness, Ada learned to respond calmly and strategically. She acknowledged concerns, provided clarity, and aligned responses with the client’s goals.

With this approach, objections became part of the conversation rather than barriers. Instead of creating doubt, they became opportunities to build trust and confidence.

**Closing: The Natural Outcome**

The final step is closing. When the earlier stages are done correctly, closing becomes a natural outcome rather than a forced action. Because Ada had prepared well, understood her clients, presented value effectively, and handled concerns professionally, her closing conversations became smooth and natural.

The lesson is simple: structure creates confidence, and confidence closes deals. If you find yourself struggling on calls, the answer is rarely more pressure or more pitching. It is a clearer, more intentional process — one that puts the client first at every stage.`,
  },

  // JULY BLOGS

  {
    id: "16",
    slug: "the-property-is-legit-is-not-a-document",
    categoryId: "insights",
    category: "Real Estate Insights",
    title: "“The Property Is Legit” Is Not a Document",
    author: "Favour Abiodun",
    date: "JULY 2026",
    publishedAt: "2026-07-07T08:00:00+01:00",
    image: "/blog/july-property-documents.png",
    excerpt:
      "“Don’t worry, the property is legit.” Here’s the truth: legit is not a document. And in real estate, if it’s not on paper, it doesn’t fully protect you.",
    content: `You’ve heard it before.

“Don’t worry, the property is legit.”

And somehow… people believe it. They pay. They wait. Then things get complicated.

Here’s the truth: “legit” is not a document. And in real estate, if it’s not on paper, it doesn’t fully protect you.

As a Daring Realtor, this is one of the most important things you can understand and explain to your clients. Because the moment you can break down property documents clearly? You become the realtor people trust.

**The Documents That Actually Matter**

**1. Certificate of Occupancy (C of O)**
This is the big one. Issued by the government, it means the land has been officially recognized and you have the right to occupy it. When clients ask “is it genuine?” a C of O is one of the strongest answers.

**2. Deed of Assignment**
This is the transfer document. It’s the paper that moves ownership from the seller to the buyer. No deed, no proof you own anything.

**3. Survey Plan**
Remember our land size article? The survey plan is what officially confirms the size, shape, and exact location of the land. It’s drawn by a licensed surveyor. Without it, you’re guessing.

**4. Governor’s Consent**
When land with a C of O is sold, the government needs to approve that transfer. That approval is called Governor’s Consent. Many buyers skip this. Don’t.

**5. Receipt & Contract of Sale**
Basic, but necessary. It shows money exchanged hands and under what terms.

**Why Realtors Need to Know This**

You’re not a lawyer. Nobody is asking you to be.
But when a client asks “which documents should I collect?” you should not be the one saying “erm… the usual ones.”

Know the names. Know what each one does. Explain it simply.

That’s the difference between a realtor who just sends listings and one who actually guides people through a deal.

**One Sentence to Remember**

Documents protect the buyer. Your knowledge protects your deal.
Know this stuff. Your clients will thank you. Your commissions will show it.`,
  },
  {
    id: "17",
    slug: "your-clients-are-waiting-are-you-ready",
    categoryId: "salesbook",
    category: "The Daring Salesbook",
    title: "Your Clients Are Waiting. Are You Ready?",
    author: "Emerald Akinjayeju",
    date: "JULY 2026",
    publishedAt: "2026-07-21T08:00:00+01:00",
    image: "/blog/july-clients-waiting.png",
    excerpt:
      "You got the property details. You saved it to your phone. And then… nothing. Some realtors will close on Jonny Gate II this month. Others will watch it happen. The difference? This.",
    content: `You got the property details. You saved it to your phone.

And then… nothing.

No calls made. No conversations started.
Just a flyer sitting in your gallery collecting dust.

Some realtors will close on Jonny Gate II this month. Others will watch it happen.

The difference? This.

**Know What You’re Selling**

Few minutes from Kwara State University. Thousands of students, lecturers, and young professionals who need housing year-round.

Dia’s Crest Hostel is right there — 24/7 light, water, solar, security. That kind of development doesn’t go up in just any area. It goes up where the demand is real and growing.

BAJ Court launched in that same community and sold out fast. Jonny Gate II is the next opportunity in that same axis.

That’s your story. Know it cold.

**How to Open the Conversation**

Don’t start with “I have a property in Malete.”

Start with this:

“There’s an axis in Ilorin that investors have been quietly moving into. We sold out our last property there faster than expected. We just opened something new and I think you should hear about it.”

Now they’re curious. Now they want to know more.

**The Questions They’ll Ask**

“Is the land dry?” — Yes. Dry land, fully fenced. No stories.
“What’s around it?” — Dia’s Crest Hostel. KWASU community. Growing infrastructure. The kind of neighbourhood that rewards early movers.
“Is it worth it?” — BAJ Court answered that question. The people who moved early are glad they did.

**How to Close**

After you’ve answered their questions, don’t wait for them to decide alone. Say:
“Based on everything, does this feel like something worth looking at further? I can send you the full details right now.”

Soft. Direct. No pressure.

Jonny Gate II sells itself — but only if you show up prepared.
Know the story. Tell it well. Ask for the next step.
Now go. Your clients are waiting.`,
  },

  // AUGUST BLOGS

  {
    id: "18",
    slug: "the-rewards-have-been-claimed",
    categoryId: "daring",
    category: "What's Daring?",
    title: "The Rewards Have Been Claimed",
    author: "",
    date: "AUGUST 2026",
    publishedAt: "2026-08-04T08:00:00+01:00",
    image: "/blog/august-rewards-claimed.png",
    excerpt:
      "Q2 is done. The power banks went to the ones who moved. Every sale and social engagement earns XP — currency you can trade for real rewards. Q3 is wide open.",
    content: `Let’s talk about what happened in Q2.

Some people in this tribe showed up — really showed up. They sold. They engaged. They earned their XP points on the Quest. And when the time came?

They walked away with power banks.

Not because they got lucky. Because they played the game.

If you’re just hearing about the Quest for the first time — here’s how it works.

Every time you sell a property or engage on our social media handles, you earn XP points. Those points are not just numbers. They are currency.

Currency you can trade in for real things:
- Trip to Seychelles
- Mini Fridge
- Electric Iron
- Power Bank
- Pen Mug
- Note Pad
- Branded Cap

The more you show up, the more you earn. Simple.

Q2 is done. The power banks went to the ones who moved.

Q3 is wide open.

The question is — what are you playing for?

Get on the Quest. Earn your XP. And let’s see your name at the top when it’s time to celebrate again.`,
  },
  {
    id: "19",
    slug: "they-said-learn-first-i-learned-and-earned",
    categoryId: "community",
    category: "Community Hub",
    title: "They Said Learn First. I Learned and Earned.",
    author: "Andrew Olanbanjo",
    date: "AUGUST 2026",
    publishedAt: "2026-08-18T08:00:00+01:00",
    image: "/blog/august-learn-and-earn.png",
    excerpt:
      "When I joined the Daring Tribe, I had nothing — no contacts, no sales background. What I had was a decision to take it seriously. That decision changed everything.",
    content: `When I joined the Daring Tribe, I had nothing.

No contacts in real estate. No background in sales. No idea how a property deal even worked from start to finish.

What I had was a decision — that I was going to take this seriously.

And that decision changed everything.

**I Won’t Pretend It Was Easy**

The first few weeks of training humbled me.

People around me seemed to already understand things I was just hearing for the first time. There were processes, conversations, and skills I had never thought about before.

But I kept showing up. I asked questions even when I felt like I should already know the answers. I practiced. I repeated things until they felt natural.

Nobody handed me confidence. I built it session by session.

**The Moment It Got Real**

When my first serious lead came in, my head was doing the most.

What if they ask something I can’t answer? What if I sound inexperienced? What if they don’t trust me?

But I had put in the work. I knew what I was talking about.

So I showed up for that conversation anyway — not perfectly, but prepared.

I listened more than I talked. I focused on what they actually needed. I followed up when others would have let it go cold.
And they came back.

We closed.

People act like having no experience is a problem.

For me, it was a clean slate. No wrong habits. No shortcuts. I learned everything the right way from the beginning — and that foundation is what’s carrying me now.

Zero experience didn’t hold me back. Choosing not to start would have.

**Where I Am Now**

I talk about properties with confidence. I handle objections without freezing. I follow up without fear.
But the biggest thing that changed? How I see myself.
Real estate didn’t just give me income. It gave me a version of myself I actually respect.

If you’ve been waiting until you “know enough” to start — you’ll be waiting forever.

The learning happens when you begin. Not before.
The Daring Tribe taught me that. And now I’m living it.`,
  },

  // SEPTEMBER BLOGS

  {
    id: "20",
    slug: "the-day-the-training-room-got-quiet",
    categoryId: "community",
    category: "Community Hub",
    title: "The Day the Training Room Got Quiet",
    author: "",
    date: "SEPTEMBER 2026",
    publishedAt: "2026-09-01T08:00:00+01:00",
    image: "/blog/september-training-quiet.png",
    excerpt:
      "A simple question in Friday training — and real silence. Not failure. A turning point. The best realtors stay in the uncomfortable moments long enough to grow through them.",
    content: `It was a regular Friday session.

Everyone was on the call. Cameras off — because let’s be honest, that’s just how online training goes.
A few people typing. A few people probably eating.

And then the facilitator asked a simple question.

“If a client asked you right now why they should invest in real estate over every other option — what would you say?”

Silence.

Not the polite silence where someone is about to answer.
The real silence. The kind where everybody is hoping someone else speaks first.

And in that moment something honest happened.
People realised they had been learning about real estate. Reading about it. Saving flyers about it.
But they hadn’t made it their own yet.

They couldn’t answer the question in their own words. From their own conviction.

That silence was not a failure. It was a turning point.

Because the people who sat in that quiet and felt uncomfortable — they were the ones who showed up differently the next session. They came back with answers. With confidence. With their own words.

That’s what training actually does.

It doesn’t just give you information. It shows you exactly where your gaps are so you can fill them.

The best realtors in the Daring Tribe are not the ones who knew everything from day one.

They’re the ones who stayed in the uncomfortable moments long enough to grow through them.

That Friday? It grew a lot of people.

Are you in a quiet moment right now? Good. Stay in it. The answer is coming.`,
  },
];


export function isBlogPostPublished(
  post: BlogPost,
  now: Date = new Date(),
): boolean {
  if (!post.publishedAt) return true
  const published = new Date(post.publishedAt)
  if (Number.isNaN(published.getTime())) return true
  return published.getTime() <= now.getTime()
}

export function getPublishedBlogPosts(now: Date = new Date()): BlogPost[] {
  return BLOG_DATA.filter((post) => isBlogPostPublished(post, now))
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_DATA.find((post) => post.slug === slug);
}

/** Live post only — returns undefined if missing or not yet published. */
export function getPublishedBlogPost(
  slug: string,
  now: Date = new Date(),
): BlogPost | undefined {
  const post = getBlogPost(slug)
  if (!post || !isBlogPostPublished(post, now)) return undefined
  return post
}

export function getRelatedPosts(
  currentSlug: string,
  categoryId: string,
  limit: number = 3,
  now: Date = new Date(),
): BlogPost[] {
  return getPublishedBlogPosts(now)
    .filter(
      (post) => post.slug !== currentSlug && post.categoryId === categoryId,
    )
    .slice(0, limit);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((cat) => cat.id === id);
}
