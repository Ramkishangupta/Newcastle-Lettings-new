import React from "react";
import { zoopla, nla, prs, deposist, clientmoney, ico } from '../assets/assets';

const members = [
  { name: "Zoopla", img: zoopla, alt: "Zoopla Logo" },
  { name: "NLA", img: nla, alt: "National Landlords Association" },
  { name: "PRS", img: prs, alt: "Property Redress Scheme" },
  { name: "MyDeposits", img: deposist, alt: "MyDeposits Logo" },
  { name: "ClientMoney", img: clientmoney, alt: "Client Money Protect" },
  { name: "ICO", img: ico, alt: "ICO Logo" },
];

const MembersSection = () => {
  return (
    <div className="w-full py-15 px-4 bg-white">
      <h2 className="text-xl md:text-3xl font-semibold text-[#002B5B] ml-9 mb-6 uppercase">Members Of :</h2>
      <div className="flex justify-evenly gap-6 items-center flex-wrap sm-min-mx-4">
        {members.map((member, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <img
              src={member.img}
              alt={member.alt}
              className="h-12 sm:h-12 md:h-18 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSection;
