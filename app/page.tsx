import Hero from "../components/Hero";
import Waitlist from "../components/Waitlist";

const FAQS = [
  {
    q: "Who is Goon for, exactly?",
    a: "Goon is a private members club for lesbian and gay men. Membership is identity-verified and intentionally limited. We are building a sanctuary, not a venue — the difference is who else is in the room.",
  },
  {
    q: "Why identity verification? Isn't that invasive?",
    a: "Verification is the price of trust. We confirm that every member is who they say they are, and that they belong to the community this club exists for. Your information is held in confidence, used solely for membership review, and never sold. Discretion is the point of the place.",
  },
  {
    q: "Where will Goon be located?",
    a: "Our first house is being prepared in West Hollywood. Exact address is shared with confirmed members only — never publicly listed.",
  },
  {
    q: "How does membership work?",
    a: "Prospective members submit a request through the waitlist. Each is reviewed individually; those accepted are invited to an in-person interview before an offer of membership is extended. Membership is annual and renewed by mutual consent.",
  },
  {
    q: "What is included in membership?",
    a: "Access to the spa, salon, and private lounge; a set number of treatments per month depending on tier; and the ability to sponsor guests for review. The full schedule of services is shared with members upon acceptance.",
  },
  {
    q: "When does Goon open?",
    a: "We are in the final stages of completing the house. Join the waitlist to be notified as the founding membership list is set and opening dates are confirmed.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <Waitlist />

      {/* FAQ */}
      <section
        id="faq"
        className="relative py-24 px-6"
        style={{
          background:
            "linear-gradient(180deg, #3E2723 0%, #2A1A15 50%, #1C1C1E 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-center animate-fade-in">
            Considerations
          </p>
          <h2 className="section-title text-center mt-4 animate-fade-in-delay-1">
            Frequently Asked
          </h2>
          <div className="ornate-divider mt-6">
            <span className="diamond" aria-hidden />
          </div>

          <div className="mt-12 grid gap-4">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="answer">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-16">
            <p
              className="font-body"
              style={{
                color: "rgba(245, 240, 232, 0.56)",
                fontSize: "1rem",
                letterSpacing: "0.04em",
              }}
            >
              Membership is by invitation, not algorithm.
            </p>
            <a href="#waitlist" className="btn-gold mt-8">
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
