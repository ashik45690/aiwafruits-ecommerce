import { Star, Quote } from "lucide-react";
import userImg from "../../assets/images/user.png";

function CustomerfeedbackSection() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Verified Organic Buyer",
      text: "Exceptional quality! The mangoes and grapes were unbelievably fresh and fragrant. Packaged with care and delivered right on time.",
    },
    {
      name: "Rahul Kumar",
      role: "Regular Weekly Subscriber",
      text: "I order our weekly fruit supply from Aiwa Fruits. The consistency in taste and farm freshness is unbeatable compared to regular markets.",
    },
    {
      name: "Anjali Menon",
      role: "Health Enthusiast",
      text: "Super clean packaging and premium quality. Knowing that these fruits are 100% certified organic gives our whole family peace of mind.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Community Trust</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Over 5,000+ happy households trust Aiwa Fruits for daily organic produce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-7 shadow-2xs hover:shadow-md hover:bg-white hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="text-amber-400 fill-amber-400"
                        size={15}
                      />
                    ))}
                  </div>
                  <Quote size={24} className="text-emerald-200" />
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                <div className="w-11 h-11 rounded-full bg-emerald-100 p-0.5 overflow-hidden shrink-0">
                  <img
                    src={userImg}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {review.name}
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-semibold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerfeedbackSection;