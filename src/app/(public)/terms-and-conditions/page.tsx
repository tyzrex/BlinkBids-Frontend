import { BsCashCoin } from "react-icons/bs";
import { FaCcMastercard, FaCcVisa, FaMoneyCheckAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdArrowForwardIos } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";

export default function TermsAndConditions() {
  const listStyle = {
    listStyleType: "disc",
  };
  return (
    <>
      <main className="max-w-layout my-10 text-justify">
        <div id="terms_and_condition">
          <div className="title title-typography font-semibold">
            <h1>TERMS AND CONDITIONS</h1>
          </div>
          <div className="updated_date my-3 ">
            <p className="font-normal text-sm text-gray-600 ">
              Last updated August 21, 2023
            </p>
          </div>
          <div className="agreement my-5">
            <h4 className="font-bold mb-2">AGREEMENT TO OUR LEGAL TERMS</h4>
            <p className=" ">
              We are Fatafat Sewa Private Limited, doing business as Fatafat
              Sewa (<strong>&apos;Company,&apos; &qout;we,&qout; &qout;us,&qout; &qout;our&qout;</strong>), a company
              registered in Nepal at Jhamsikhel Road-3, Lalitpur, Lalitpur,
              Bagmati.
            </p>
            <p className=" mt-2">
              We operate the website{" "}
              <a
                href="www.fatafatsewa.com"
                className="underline decoration-gray-500  decoration-1  underline-offset-4"
              >
                http://www.fatafatsewa.com
              </a>{" "}
              (the
              <strong>&qout;Site&qout;</strong>), as well as any other related products
              and services that refer or link to these legal terms (the{" "}
              <strong>&qout;Legal Terms&qout;</strong>) (collectively, the{" "}
              <strong>&qout;Services&qout;</strong>).
            </p>
            <p className="leading-relaxed mt-2 ">
              You can contact us by email at info@fatafatsewa.com or by mail to
              Jhamsikhel Road-3, Lalitpur, Lalitpur, Bagmati, Nepal.
            </p>
            <p className="leading-relaxed mt-2">
              These Legal Terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity (
              <strong>&qout;you&qout;</strong>), and Fatafat Sewa Private Limited,
              concerning your access to and use of the Services. You agree that
              by accessing the Services, you have read, understood, and agreed
              to be bound by all of these Legal Terms.
              <strong>
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
                EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                DISCONTINUE USE IMMEDIATELY.
              </strong>
            </p>
            <p className="leading-relaxed mt-2">
              Supplemental terms and conditions or documents that may be posted
              on the Services from time to time are hereby expressly
              incorporated herein by reference. We reserve the right, in our
              sole discretion, to make changes or modifications to these Legal
              Terms at any time and for any reason. We will alert you about any
              changes by updating the &qout;Last updated&qout; date of these Legal Terms,
              and you waive any right to receive specific notice of each such
              change. It is your responsibility to periodically review these
              Legal Terms to stay informed of updates. You will be subject to,
              and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Legal Terms by your continued
              use of the Services after the date such revised Legal Terms are
              posted.
            </p>
            <p className="leading-relaxed">
              The Services are intended for users who are at least 18 years old.
              Persons under the age of 18 are not permitted to use or register
              for the Services.
            </p>
          </div>
          {/* <div className="table_of_content">
          <h4 className="title-typography">TABLE OF CONTENTS</h4>
          <ol>
            <li>OUR SERVICES</li>
            <li>INTELLECTUAL PROPERTY RIGHTS</li>
            <li>USER REPRESENTATIONS</li>
            <li>USER REGISTRATION</li>
            <li>PRODUCTS</li>
            <li>PURCHASES AND PAYMENT</li>
            <li>RETURN POLICY</li>
            <li>PROHIBITED ACTIVITIES</li>
            <li>USER GENERATED CONTRIBUTIONS</li>
            <li>CONTRIBUTION LICENSE</li>
            <li>GUIDELINES FOR REVIEWS</li>
            <li>SOCIAL MEDIA</li>
            <li>THIRD-PARTY WEBSITES AND CONTENT</li>
            <li>ADVERTISERS</li>
            <li>SERVICES MANAGEMENT</li>
            <li>PRIVACY POLICY</li>
            <li>TERM AND TERMINATION</li>
            <li>MODIFICATIONS AND INTERRUPTIONS</li>
            <li>GOVERNING LAW</li>
            <li>DISPUTE RESOLUTION</li>
            <li>CORRECTIONS</li>
            <li>DISCLAIMER</li>
            <li>LIMITATIONS OF LIABILITY</li>
            <li>INDEMNIFICATION</li>
            <li>USER DATA</li>
            <li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
            <li>MISCELLANEOUS</li>
            <li>CONTACT US</li>
          </ol>
        </div> */}
          <div className="content">
            <ol>
              <li className="my-5">
                <h4 className=" font-bold mb-2">OUR SERVICES</h4>
                <p className="leading-relaxed">
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation or which would subject
                  us to any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Services from other locations do so on their own initiative
                  and are solely responsible for compliance with local laws, if
                  and to the extent local laws are applicable.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2 ">
                  INTELLECTUAL PROPERTY RIGHTS
                </h4>
                <h5 className="font-medium mt-1 flex  items-center">
                  <LiaCheckSolid className="w-5 h-5 mr-1" />
                  Our intellectual property
                </h5>
                <p className="leading-relaxed mt-2">
                  We are the owner or the licensee of all intellectual property
                  rights in our Services, including all source code, databases,
                  functionality, software, website designs, audio, video, text,
                  photographs, and graphics in the Services (collectively, the
                    &qout;Content&qout;), as well as the trademarks, service marks, and
                  logos contained therein (the &qout;Marks&qout;).
                </p>
                <p className="mt-2">
                  Our Content and Marks are protected by copyright and trademark
                  laws (and various other intellectual property rights and
                  unfair competition laws) and treaties.
                </p>
                <h5 className="font-medium mt-2 flex  items-center">
                  {" "}
                  <LiaCheckSolid className="w-5 h-5 mr-1" />
                  Your use of our Services
                </h5>
                <p className="mt-2">
                  Subject to your compliance with these Legal Terms, including
                  the &qout;PROHIBITED ACTIVITIES&qout; section below, we grant you a
                  non-exclusive, non-transferable, revocable license to:
                </p>
                <ul>
                  <li>access the Services; and</li>
                  <li>
                    download or print a copy of any portion of the Content to
                    which you have properly gained access.
                  </li>
                </ul>
                <p className="mt-2">
                  solely for your personal, non-commercial use.
                </p>
                <p className="mt-2">
                  Except as set out in this section or elsewhere in our Legal
                  Terms, no part of the Services and no Content or Marks may be
                  copied, reproduced, aggregated, republished, uploaded, posted,
                  publicly displayed, encoded, translated, transmitted,
                  distributed, sold, licensed, or otherwise exploited for any
                  commercial purpose whatsoever, without our express prior
                  written permission.
                </p>
                <p className="mt-2">
                  If you wish to make any use of the Services, Content, or Marks
                  other than as set out in this section or elsewhere in our
                  Legal Terms, please address your request to:
                  info@fatafatsewa.com. If we ever grant you the permission to
                  post, reproduce, or publicly display any part of our Services
                  or Content, you must identify us as the owners or licensors of
                  the Services, Content, or Marks and ensure that any copyright
                  or proprietary notice appears or is visible on posting,
                  reproducing, or displaying our Content.
                </p>
                <p className="leading-relaxed">
                  We reserve all rights not expressly granted to you in and to
                  the Services, Content, and Marks.
                </p>
                <p className="leading-relaxed">
                  Any breach of these Intellectual Property Rights will
                  constitute a material breach of our Legal Terms and your right
                  to use our Services will terminate immediately.
                </p>
                <h5 className="font-medium mt-2 flex  items-center">
                  {" "}
                  <LiaCheckSolid className="w-5 h-5 mr-1" />
                  Your submissions
                </h5>
                <p className="leading-relaxed mt-2">
                  Please review this section and the &qout;PROHIBITED ACTIVITIES&qout;
                  section carefully prior to using our Services to understand
                  the (a) rights you give us and (b) obligations you have when
                  you post or upload any content through the Services.
                </p>
                <p className="leading-relaxed mt-2">
                  <strong>Submissions:</strong> By directly sending us any
                  question, comment, suggestion, idea, feedback, or other
                  information about the Services (&qout;Submissions&qout;), you agree to
                  assign to us all intellectual property rights in such
                  Submission. You agree that we shall own this Submission and be
                  entitled to its unrestricted use and dissemination for any
                  lawful purpose, commercial or otherwise, without
                  acknowledgment or compensation to you.
                </p>
                <p className="leading-relaxed mt-2">
                  <strong>
                    {" "}
                    You are responsible for what you post or upload:
                  </strong>{" "}
                  By sending us Submissions through any part of the Services
                  you:
                </p>
                <ul className="leading-relaxed">
                  <li>
                    confirm that you have read and agree with our &qout;PROHIBITED
                    ACTIVITIES&qout; and will not post, send, publish, upload, or
                    transmit through the Services any Submission that is
                    illegal, harassing, hateful, harmful, defamatory, obscene,
                    bullying, abusive, discriminatory, threatening to any person
                    or group, sexually explicit, false, inaccurate, deceitful,
                    or misleading;
                  </li>
                  <li>
                    to the extent permissible by applicable law, waive any and
                    all moral rights to any such Submission;
                  </li>
                  <li>
                    warrant that any such Submission are original to you or that
                    you have the necessary rights and licenses to submit such
                    Submissions and that you have full authority to grant us the
                    above-mentioned rights in relation to your Submissions; and
                  </li>
                  <li>
                    warrant and represent that your Submissions do not
                    constitute confidential information.
                  </li>
                </ul>
                <p className="leading-relaxed">
                  You are solely responsible for your Submissions and you
                  expressly agree to reimburse us for any and all losses that we
                  may suffer because of your breach of (a) this section, (b) any
                  third party&paos;s intellectual property rights, or (c) applicable
                  law.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">USER REPRESENTATIONS</h4>
                <p className="leading-relaxed">
                  By using the Services, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate,
                  current, and complete; (2) you will maintain the accuracy of
                  such information and promptly update such registration
                  information as necessary; (3) you have the legal capacity and
                  you agree to comply with these Legal Terms; (4) you are not a
                  minor in the jurisdiction in which you reside; (5) you will
                  not access the Services through automated or non-human means,
                  whether through a bot, script or otherwise; (6) you will not
                  use the Services for any illegal or unauthorized purpose; and
                  (7) your use of the Services will not violate any applicable
                  law or regulation.
                </p>
                <p className="leading-relaxed  mt-2">
                  If you provide any information that is untrue, inaccurate, not
                  current, or incomplete, we have the right to suspend or
                  terminate your account and refuse any and all current or
                  future use of the Services (or any portion thereof)
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2"> USER REGISTRATION</h4>
                <p className="leading-relaxed">
                  You may be required to register to use the Services. You agree
                  to keep your password confidential and will be responsible for
                  all use of your account and password. We reserve the right to
                  remove, reclaim, or change a username you select if we
                  determine, in our sole discretion, that such username is
                  inappropriate, obscene, or otherwise objectionable.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">PRODUCTS</h4>
                <p className="leading-relaxed">
                  We make every effort to display as accurately as possible the
                  colors, features, specifications, and details of the products
                  available on the Services. However, we do not guarantee that
                  the colors, features, specifications, and details of the
                  products will be accurate, complete, reliable, current, or
                  free of other errors, and your electronic display may not
                  accurately reflect the actual colors and details of the
                  products. All products are subject to availability, and we
                  cannot guarantee that items will be in stock. We reserve the
                  right to discontinue any products at any time for any reason.
                  Prices for all products are subject to change.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">PURCHASES AND PAYMENT</h4>
                <p className="leading-relaxed">
                  We accept the following forms of payment:
                </p>
                <ul className="leading-relaxed">
                  <li className="flex ml-2 items-center">
                    <FaCcVisa className="w-5 h-5 mr-2" />
                    Visa
                  </li>
                  <li className="flex ml-2 items-center">
                    <FaCcMastercard className="w-5 h-5 mr-2" />
                    Mastercard
                  </li>
                  <li className="flex ml-2 items-center">
                    <FaMoneyCheckAlt  className="w-5 h-5 mr-2" />
                    Digital Wallet
                  </li>
                  <li className="flex ml-2 items-center">
                    <BsCashCoin  className="w-5 h-5 mr-2" />
                    Cash On Delivery
                  </li>
                </ul>
                <p className="leading-relaxed mt-2">
                  You agree to provide current, complete, and accurate purchase
                  and account information for all purchases made via the
                  Services. You further agree to promptly update account and
                  payment information, including email address, payment method,
                  and payment card expiration date, so that we can complete your
                  transactions and contact you as needed. Sales tax will be
                  added to the price of purchases as deemed required by us. We
                  may change prices at any time. All payments shall be in
                  Nepalese Rupee.
                </p>
                <p className="leading-relaxed mt-2">
                  You agree to pay all charges at the prices then in effect for
                  your purchases and any applicable shipping fees, and you
                  authorize us to charge your chosen payment provider for any
                  such amounts upon placing your order. We reserve the right to
                  correct any errors or mistakes in pricing, even if we have
                  already requested or received payment.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to refuse any order placed through the
                  Services. We may, in our sole discretion, limit or cancel
                  quantities purchased per person, per household, or per order.
                  These restrictions may include orders placed by or under the
                  same customer account, the same payment method, and/or orders
                  that use the same billing or shipping address. We reserve the
                  right to limit or prohibit orders that, in our sole judgment,
                  appear to be placed by dealers, resellers, or distributors.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">RETURN POLICY</h4>
                <p className="leading-relaxed">
                  Please review our Return Policy posted on the Services prior
                  to making any purchases.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">PROHIBITED ACTIVITIES</h4>
                <p className="leading-relaxed mt-2">
                  You may not access or use the Services for any purpose other
                  than that for which we make the Services available. The
                  Services may not be used in connection with any commercial
                  endeavors except those that are specifically endorsed or
                  approved by us.
                </p>
                <p className="leading-relaxed mt-2 font-semibold">
                  As a user of the Services, you agree not to:
                </p>
                <ul style={listStyle} className="pl-6 leading-relaxed">
                  <li>
                    Systematically retrieve data or other content from the
                    Services to create or compile, directly or indirectly, a
                    collection, compilation, database, or directory without
                    written permission from us.
                  </li>
                  <li>
                    Trick, defraud, or mislead us and other users, especially in
                    any attempt to learn sensitive account information such as
                    user passwords.
                  </li>
                  <li>
                    Circumvent, disable, or otherwise interfere with
                    security-related features of the Services, including
                    features that prevent or restrict the use or copying of any
                    Content or enforce limitations on the use of the Services
                    and/or the Content contained therein.
                  </li>
                  <li>
                    Disparage, tarnish, or otherwise harm, in our opinion, us
                    and/or the Services.
                  </li>
                  <li>
                    Use any information obtained from the Services in order to
                    harass, abuse, or harm another person.
                  </li>
                  <li>
                    Make improper use of our support services or submit false
                    reports of abuse or misconduct.
                  </li>
                  <li>
                    Use the Services in a manner inconsistent with any
                    applicable laws or regulations.
                  </li>
                  <li>
                    Engage in unauthorized framing of or linking to the
                    Services.
                  </li>
                  <li>
                    Upload or transmit (or attempt to upload or to transmit)
                    viruses, Trojan horses, or other material, including
                    excessive use of capital letters and spamming (continuous
                    posting of repetitive text), that interferes with any
                    party&apos;s uninterrupted use and enjoyment of the Services or
                    modifies, impairs, disrupts, alters, or interferes with the
                    use, features, functions, operation, or maintenance of the
                    Services.
                  </li>
                  <li>
                    Engage in any automated use of the system, such as using
                    scripts to send comments or messages, or using any data
                    mining, robots, or similar data gathering and extraction
                    tools.
                  </li>
                  <li>
                    Delete the copyright or other proprietary rights notice from
                    any Content.
                  </li>
                  <li>
                    Attempt to impersonate another user or person or use the
                    username of another user.
                  </li>
                  <li>
                    Upload or transmit (or attempt to upload or to transmit) any
                    material that acts as a passive or active information
                    collection or transmission mechanism, including without
                    limitation, clear graphics interchange formats (&qout;gifs&qout;), 1×1
                    pixels, web bugs, cookies, or other similar devices
                    (sometimes referred to as &qout;spyware&qout; or &qout;passive collection
                    mechanisms&qout; or &qout;pcms&qout;).
                  </li>
                  <li>
                    Interfere with, disrupt, or create an undue burden on the
                    Services or the networks or services connected to the
                    Services.
                  </li>
                  <li>
                    Harass, annoy, intimidate, or threaten any of our employees
                    or agents engaged in providing any portion of the Services
                    to you.
                  </li>
                  <li>
                    Attempt to bypass any measures of the Services designed to
                    prevent or restrict access to the Services, or any portion
                    of the Services.
                  </li>
                  <li>
                    Copy or adapt the Services&apos; software, including but not
                    limited to Flash, PHP, HTML, JavaScript, or other code.
                  </li>
                  <li>
                    Except as permitted by applicable law, decipher, decompile,
                    disassemble, or reverse engineer any of the software
                    comprising or in any way making up a part of the Services.
                  </li>
                  <li>
                    Except as may be the result of standard search engine or
                    Internet browser usage, use, launch, develop, or distribute
                    any automated system, including without limitation, any
                    spider, robot, cheat utility, scraper, or offline reader
                    that accesses the Services, or use or launch any
                    unauthorized script or other software.
                  </li>
                  <li>
                    Use a buying agent or purchasing agent to make purchases on
                    the Services.
                  </li>
                  <li>
                    Make any unauthorized use of the Services, including
                    collecting usernames and/or email addresses of users by
                    electronic or other means for the purpose of sending
                    unsolicited email, or creating user accounts by automated
                    means or under false pretenses.
                  </li>
                  <li>
                    Use the Services as part of any effort to compete with us or
                    otherwise use the Services and/or the Content for any
                    revenue-generating endeavor or commercial enterprise.
                  </li>
                </ul>
              </li>
              <li>
                <h4 className="font-bold mb-2 my-5">
                  USER GENERATED CONTRIBUTIONS
                </h4>
                <p className="leading-relaxed mt-2 ">
                  The Services does not offer users to submit or post content.
                  We may provide you with the opportunity to create, submit,
                  post, display, transmit, perform, publish, distribute, or
                  broadcast content and materials to us or on the Services,
                  including but not limited to text, writings, video, audio,
                  photographs, graphics, comments, suggestions, or personal
                  information or other material (collectively, &qout;Contributions&qout;).
                  Contributions may be viewable by other users of the Services
                  and through third-party websites. When you create or make
                  available any Contributions, you thereby represent and warrant
                  that:
                </p>
                <ul style={listStyle} className="leading-relaxed pl-5">
                  <li>
                    The creation, distribution, transmission, public display, or
                    performance, and the accessing, downloading, or copying of
                    your Contributions do not and will not infringe the
                    proprietary rights, including but not limited to the
                    copyright, patent, trademark, trade secret, or moral rights
                    of any third party.
                  </li>
                  <li>
                    You are the creator and owner of or have the necessary
                    licenses, rights, consents, releases, and permissions to use
                    and to authorize us, the Services, and other users of the
                    Services to use your Contributions in any manner
                    contemplated by the Services and these Legal Terms.
                  </li>
                  <li>
                    You have the written consent, release, and/or permission of
                    each and every identifiable individual person in your
                    Contributions to use the name or likeness of each and every
                    such identifiable individual person to enable inclusion and
                    use of your Contributions in any manner contemplated by the
                    Services and these Legal Terms.
                  </li>
                  <li>
                    Your Contributions are not false, inaccurate, or misleading.
                  </li>
                  <li>
                    Your Contributions are not unsolicited or unauthorized
                    advertising, promotional materials, pyramid schemes, chain
                    letters, spam, mass mailings, or other forms of
                    solicitation.
                  </li>
                  <li>
                    Your Contributions are not obscene, lewd, lascivious,
                    filthy, violent, harassing, libelous, slanderous, or
                    otherwise objectionable (as determined by us).
                  </li>
                  <li>
                    Your Contributions do not ridicule, mock, disparage,
                    intimidate, or abuse anyone.
                  </li>
                  <li>
                    Your Contributions are not used to harass or threaten (in
                    the legal sense of those terms) any other person and to
                    promote violence against a specific person or className of
                    people.
                  </li>
                  <li>
                    Your Contributions do not violate any applicable law,
                    regulation, or rule.
                  </li>
                  <li>
                    Your Contributions do not violate the privacy or publicity
                    rights of any third party.
                  </li>
                  <li>
                    Your Contributions do not violate any applicable law
                    concerning child pornography, or otherwise intended to
                    protect the health or well-being of minors.
                  </li>
                  <li>
                    Your Contributions do not include any offensive comments
                    that are connected to race, national origin, gender, sexual
                    preference, or physical handicap.
                  </li>
                  <li>
                    Your Contributions do not otherwise violate, or link to
                    material that violates, any provision of these Legal Terms,
                    or any applicable law or regulation.
                  </li>
                </ul>
                <p className="leading-relaxed">
                  Any use of the Services in violation of the foregoing violates
                  these Legal Terms and may result in, among other things,
                  termination or suspension of your rights to use the Services.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold ">CONTRIBUTION LICENSE</h4>
                <p className="leading-relaxed mt-2">
                  You and Services agree that we may access, store, process, and
                  use any information and personal data that you provide and
                  your choices (including settings).
                </p>
                <p className="leading-relaxed mt-2">
                  By submitting suggestions or other feedback regarding the
                  Services, you agree that we can use and share such feedback
                  for any purpose without compensation to you.
                </p>
                <p className="leading-relaxed mt-2">
                  We do not assert any ownership over your Contributions. You
                  retain full ownership of all of your Contributions and any
                  intellectual property rights or other proprietary rights
                  associated with your Contributions. We are not liable for any
                  statements or representations in your Contributions provided
                  by you in any area on the Services. You are solely responsible
                  for your Contributions to the Services and you expressly agree
                  to exonerate us from any and all responsibility and to refrain
                  from any legal action against us regarding your Contributions.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">GUIDELINES FOR REVIEWS</h4>
                <p className="leading-relaxed mt-2">
                  We may provide you areas on the Services to leave reviews or
                  ratings. When posting a review, you must comply with the
                  following criteria: (1) you should have firsthand experience
                  with the person/entity being reviewed; (2) your reviews should
                  not contain offensive profanity, or abusive, racist,
                  offensive, or hateful language; (3) your reviews should not
                  contain discriminatory references based on religion, race,
                  gender, national origin, age, marital status, sexual
                  orientation, or disability; (4) your reviews should not
                  contain references to illegal activity; (5) you should not be
                  affiliated with competitors if posting negative reviews; (6)
                  you should not make any conclusions as to the legality of
                  conduct; (7) you may not post any false or misleading
                  statements; and (8) you may not organize a campaign
                  encouraging others to post reviews, whether positive or
                  negative.
                </p>
                <p className="leading-relaxed mt-2">
                  We may accept, reject, or remove reviews in our sole
                  discretion. We have absolutely no obligation to screen reviews
                  or to delete reviews, even if anyone considers reviews
                  objectionable or inaccurate. Reviews are not endorsed by us,
                  and do not necessarily represent our opinions or the views of
                  any of our affiliates or partners. We do not assume liability
                  for any review or for any claims, liabilities, or losses
                  resulting from any review. By posting a review, you hereby
                  grant to us a perpetual, non-exclusive, worldwide,
                  royalty-free, fully paid, assignable, and sublicensable right
                  and license to reproduce, modify, translate, transmit by any
                  means, display, perform, and/or distribute all content
                  relating to review.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">SOCIAL MEDIA</h4>
                <p className="leading-relaxed mt-2">
                  As part of the functionality of the Services, you may link
                  your account with online accounts you have with third-party
                  service providers (each such account, a &qout;Third-Party Account&qout;)
                  by either: (1) providing your Third-Party Account login
                  information through the Services; or (2) allowing us to access
                  your Third-Party Account, as is permitted under the applicable
                  terms and conditions that govern your use of each Third-Party
                  Account. You represent and warrant that you are entitled to
                  disclose your Third-Party Account login information to us
                  and/or grant us access to your Third-Party Account, without
                  breach by you of any of the terms and conditions that govern
                  your use of the applicable Third-Party Account, and without
                  obligating us to pay any fees or making us subject to any
                  usage limitations imposed by the third-party service provider
                  of the Third-Party Account. By granting us access to any
                  Third-Party Accounts, you understand that (1) we may access,
                  make available, and store (if applicable) any content that you
                  have provided to and stored in your Third-Party Account (the
                    &qout;Social Network Content&qout;) so that it is available on and
                  through the Services via your account, including without
                  limitation any friend lists and (2) we may submit to and
                  receive from your Third-Party Account additional information
                  to the extent you are notified when you link your account with
                  the Third-Party Account. Depending on the Third-Party Accounts
                  you choose and subject to the privacy settings that you have
                  set in such Third-Party Accounts, personally identifiable
                  information that you post to your Third-Party Accounts may be
                  available on and through your account on the Services. Please
                  note that if a Third-Party Account or associated service
                  becomes unavailable or our access to such Third-Party Account
                  is terminated by the third-party service provider, then Social
                  Network Content may no longer be available on and through the
                  Services. You will have the ability to disable the connection
                  between your account on the Services and your Third-Party
                  Accounts at any time. 
                  <strong>PLEASE NOTE THAT YOUR RELATIONSHIP WITH
                  THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR
                  THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S)
                  WITH SUCH THIRD-PARTY SERVICE PROVIDERS. </strong>We make no effort to
                  review any Social Network Content for any purpose, including
                  but not limited to, for accuracy, legality, or
                  non-infringement, and we are not responsible for any Social
                  Network Content. You acknowledge and agree that we may access
                  your email address book associated with a Third-Party Account
                  and your contacts list stored on your mobile device or tablet
                  computer solely for purposes of identifying and informing you
                  of those contacts who have also registered to use the
                  Services. You can deactivate the connection between the
                  Services and your Third-Party Account by contacting us using
                  the contact information below or through your account settings
                  (if applicable). We will attempt to delete any information
                  stored on our servers that was obtained through such
                  Third-Party Account, except the username and profile picture
                  that become associated with your account.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">
                  THIRD-PARTY WEBSITES AND CONTENT
                </h4>
                <p className="leading-relaxed mt-2">
                  The Services may contain (or you may be sent via the Site)
                  links to other websites (&qout;Third-Party Websites&qout;) as well as
                  articles, photographs, text, graphics, pictures, designs,
                  music, sound, video, information, applications, software, and
                  other content or items belonging to or originating from third
                  parties (Third-Party Content&qout;). Such Third-Party Websites and
                  Third-Party Content are not investigated, monitored, or
                  checked for accuracy, appropriateness, or completeness by us,
                  and we are not responsible for any Third-Party Websites
                  accessed through the Services or any Third-Party Content
                  posted on, available through, or installed from the Services,
                  including the content, accuracy, offensiveness, opinions,
                  reliability, privacy practices, or other policies of or
                  contained in the Third-Party Websites or the Third-Party
                  Content. Inclusion of, linking to, or permitting the use or
                  installation of any Third-Party Websites or any Third-Party
                  Content does not imply approval or endorsement thereof by us.
                  If you decide to leave the Services and access the Third-Party
                  Websites or to use or install any Third-Party Content, you do
                  so at your own risk, and you should be aware these Legal Terms
                  no longer govern. You should review the applicable terms and
                  policies, including privacy and data gathering practices, of
                  any website to which you navigate from the Services or
                  relating to any applications you use or install from the
                  Services. Any purchases you make through Third-Party Websites
                  will be through other websites and from other companies, and
                  we take no responsibility whatsoever in relation to such
                  purchases which are exclusively between you and the applicable
                  third party. You agree and acknowledge that we do not endorse
                  the products or services offered on Third-Party Websites and
                  you shall hold us blameless from any harm caused by your
                  purchase of such products or services. Additionally, you shall
                  hold us blameless from any losses sustained by you or harm
                  caused to you relating to or resulting in any way from any
                  Third-Party Content or any contact with Third-Party Websites.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">ADVERTISERS</h4>
                <p className="leading-relaxed mt-2">
                  We allow advertisers to display their advertisements and other
                  information in certain areas of the Services, such as sidebar
                  advertisements or banner advertisements. We simply provide the
                  space to place such advertisements, and we have no other
                  relationship with advertisers.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">SERVICES MANAGEMENT</h4>
                <p className="leading-relaxed mt-2">
                  We reserve the right, but not the obligation, to: (1) monitor
                  the Services for violations of these Legal Terms; (2) take
                  appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Legal Terms, including
                  without limitation, reporting such user to law enforcement
                  authorities; (3) in our sole discretion and without
                  limitation, refuse, restrict access to, limit the availability
                  of, or disable (to the extent technologically feasible) any of
                  your Contributions or any portion thereof; (4) in our sole
                  discretion and without limitation, notice, or liability, to
                  remove from the Services or otherwise disable all files and
                  content that are excessive in size or are in any way
                  burdensome to our systems; and (5) otherwise manage the
                  Services in a manner designed to protect our rights and
                  property and to facilitate the proper functioning of the
                  Services.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">PRIVACY POLICY</h4>
                <p className="leading-relaxed mt-2">
                  We care about data privacy and security. By using the
                  Services, you agree to be bound by our Privacy Policy posted
                  on the Services, which is incorporated into these Legal Terms.
                  Please be advised the Services are hosted in Nepal. If you
                  access the Services from any other region of the world with
                  laws or other requirements governing personal data collection,
                  use, or disclosure that differ from applicable laws in Nepal,
                  then through your continued use of the Services, you are
                  transferring your data to Nepal, and you expressly consent to
                  have your data transferred to and processed in Nepal.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">TERM AND TERMINATION</h4>
                <p className="leading-relaxed mt-2">
                  These Legal Terms shall remain in full force and effect while
                  you use the Services.
                  <strong className="">
                   WITHOUT LIMITING ANY OTHER PROVISION OF
                  THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE
                  DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                  USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES),
                  TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                  WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
                  OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
                  APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                  PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY
                  CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
                  WARNING, IN OUR SOLE DISCRETION
                  </strong>
                </p>
                <p className="leading-relaxed mt-2">
                  If we terminate or suspend your account for any reason, you
                  are prohibited from registering and creating a new account
                  under your name, a fake or borrowed name, or the name of any
                  third party, even if you may be acting on behalf of the third
                  party. In addition to terminating or suspending your account,
                  we reserve the right to take appropriate legal action,
                  including without limitation pursuing civil, criminal, and
                  injunctive redress.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">
                  MODIFICATIONS AND INTERRUPTIONS
                </h4>
                <p className="leading-relaxed mt-2">
                  We reserve the right to change, modify, or remove the contents
                  of the Services at any time or for any reason at our sole
                  discretion without notice.
                  However, we have no obligation to
                  update any information on our Services. We also reserve the
                  right to modify or discontinue all or part of the Services
                  without notice at any time. We will not be liable to you or
                  any third party for any modification, price change,
                  suspension, or discontinuance of the Services.
                </p>
                <p className="leading-relaxed mt-2">
                  We cannot guarantee the Services will be available at all
                  times. We may experience hardware, software, or other problems
                  or need to perform maintenance related to the Services,
                  resulting in interruptions, delays, or errors. We reserve the
                  right to change, revise, update, suspend, discontinue, or
                  otherwise modify the Services at any time or for any reason
                  without notice to you. You agree that we have no liability
                  whatsoever for any loss, damage, or inconvenience caused by
                  your inability to access or use the Services during any
                  downtime or discontinuance of the Services. Nothing in these
                  Legal Terms will be construed to obligate us to maintain and
                  support the Services or to supply any corrections, updates, or
                  releases in connection therewith.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">GOVERNING LAW</h4>
                <p className="leading-relaxed mt-2">
                  These Legal Terms shall be governed by and defined following
                  the laws of Nepal. Fatafat Sewa Private Limited and yourself
                  irrevocably consent that the courts of Nepal shall have
                  exclusive jurisdiction to resolve any dispute which may arise
                  in connection with these Legal Terms.
                </p>
              </li>
              <li>
                <h4 className="font-bold mb-2">DISPUTE RESOLUTION</h4>
                <h5>Informal Negotiations</h5>
                <p className="leading-relaxed mt-2">
                  To expedite resolution and control the cost of any dispute,
                  controversy, or claim related to these Legal Terms (each a
                  &qout;Dispute&qout; and collectively, the &qout;Disputes&qout;) brought by either
                  you or us (individually, a &qout;Party&qout; and collectively, the
                  &qout;Parties&qout;), the Parties agree to first attempt to negotiate
                  any Dispute (except those Disputes expressly provided below)
                  informally for at least seven (7) days before initiating
                  arbitration. Such informal negotiations commence upon written
                  notice from one Party to the other Party.
                </p>
                <h5>Restrictions</h5>
                <p className="leading-relaxed mt-2">
                  The Parties agree that any arbitration shall be limited to the
                  Dispute between the Parties individually. To the full extent
                  permitted by law, (a) no arbitration shall be joined with any
                  other proceeding; (b) there is no right or authority for any
                  Dispute to be arbitrated on a className-action basis or to
                  utilize className action procedures; and (c) there is no right
                  or authority for any Dispute to be brought in a purported
                  representative capacity on behalf of the general public or any
                  other persons.
                </p>
                <h5>Exceptions to Informal Negotiations and Arbitration</h5>
                <p className="leading-relaxed mt-2">
                  The Parties agree that the following Disputes are not subject
                  to the above provisions concerning informal negotiations
                  binding arbitration: (a) any Disputes seeking to enforce or
                  protect, or concerning the validity of, any of the
                  intellectual property rights of a Party; (b) any Dispute
                  related to, or arising from, allegations of theft, piracy,
                  invasion of privacy, or unauthorized use; and (c) any claim
                  for injunctive relief. If this provision is found to be
                  illegal or unenforceable, then neither Party will elect to
                  arbitrate any Dispute falling within that portion of this
                  provision found to be illegal or unenforceable and such
                  Dispute shall be decided by a court of competent jurisdiction
                  within the courts listed for jurisdiction above, and the
                  Parties agree to submit to the personal jurisdiction of that
                  court.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">CORRECTIONS</h4>
                <p className="leading-relaxed mt-2">
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">DISCLAIMER</h4>
                <p className="leading-relaxed mt-2">
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                  RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                  WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                  SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION,
                  THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
                  WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                  COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY
                  WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
                  WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
                  MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
                  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                  RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY
                  UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY
                  AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
                  STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                  TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES,
                  TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
                  THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS
                  OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR
                  DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY
                  CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
                  THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                  RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
                  OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED
                  WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY
                  BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR
                  IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
                  BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
                  SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH
                  ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
                  JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">LIMITATIONS OF LIABILITY</h4>
                <p className="leading-relaxed mt-2">
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                  LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                  CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                  DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                  OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF
                  WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
                  LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF
                  THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE
                  AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND
                  INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
                  WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
                  IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
                  DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY
                  HAVE ADDITIONAL RIGHTS.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">INDEMNIFICATION</h4>
                <p className="leading-relaxed mt-2">
                  You agree to defend, indemnify, and hold us harmless,
                  including our subsidiaries, affiliates, and all of our
                  respective officers, agents, partners, and employees, from and
                  against any loss, damage, liability, claim, or demand,
                  including reasonable attorneys’ fees and expenses, made by any
                  third party due to or arising out of: (1) use of the Services;
                  (2) breach of these Legal Terms; (3) any breach of your
                  representations and warranties set forth in these Legal Terms;
                  (4) your violation of the rights of a third party, including
                  but not limited to intellectual property rights; or (5) any
                  overt harmful act toward any other user of the Services with
                  whom you connected via the Services. Notwithstanding the
                  foregoing, we reserve the right, at your expense, to assume
                  the exclusive defense and control of any matter for which you
                  are required to indemnify us, and you agree to cooperate, at
                  your expense, with our defense of such claims. We will use
                  reasonable efforts to notify you of any such claim, action, or
                  proceeding which is subject to this indemnification upon
                  becoming aware of it.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">USER DATA</h4>
                <p className="leading-relaxed mt-2">
                  We will maintain certain data that you transmit to the
                  Services for the purpose of managing the performance of the
                  Services, as well as data relating to your use of the
                  Services. Although we perform regular routine backups of data,
                  you are solely responsible for all data that you transmit or
                  that relates to any activity you have undertaken using the
                  Services. You agree that we shall have no liability to you for
                  any loss or corruption of any such data, and you hereby waive
                  any right of action against us arising from any such loss or
                  corruption of such data.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">
                  ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                </h4>
                <p className="leading-relaxed mt-2">
                  Visiting the Services, sending us emails, and completing
                  online forms constitute electronic communications. You consent
                  to receive electronic communications, and you agree that all
                  agreements, notices, disclosures, and other communications we
                  provide to you electronically, via email and on the Services,
                  satisfy any legal requirement that such communication be in
                  writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                  CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC
                  DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
                  INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby
                  waive any rights or requirements under any statutes,
                  regulations, rules, ordinances, or other laws in any
                  jurisdiction which require an original signature or delivery
                  or retention of non-electronic records, or to payments or the
                  granting of credits by any means other than electronic means.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">MISCELLANEOUS</h4>
                <p className="leading-relaxed mt-2">
                  These Legal Terms and any policies or operating rules posted
                  by us on the Services or in respect to the Services constitute
                  the entire agreement and understanding between you and us. Our
                  failure to exercise or enforce any right or provision of these
                  Legal Terms shall not operate as a waiver of such right or
                  provision. These Legal Terms operate to the fullest extent
                  permissible by law. We may assign any or all of our rights and
                  obligations to others at any time. We shall not be responsible
                  or liable for any loss, damage, delay, or failure to act
                  caused by any cause beyond our reasonable control. If any
                  provision or part of a provision of these Legal Terms is
                  determined to be unlawful, void, or unenforceable, that
                  provision or part of the provision is deemed severable from
                  these Legal Terms and does not affect the validity and
                  enforceability of any remaining provisions. There is no joint
                  venture, partnership, employment or agency relationship
                  created between you and us as a result of these Legal Terms or
                  use of the Services. You agree that these Legal Terms will not
                  be construed against us by virtue of having drafted them. You
                  hereby waive any and all defenses you may have based on the
                  electronic form of these Legal Terms and the lack of signing
                  by the parties hereto to execute these Legal Terms.
                </p>
              </li>
              <li className="my-5">
                <h4 className="font-bold mb-2">CONTACT US</h4>
                <p className="leading-relaxed mt-2">
                  In order to resolve a complaint regarding the Services or to
                  receive further information regarding use of the Services,
                  please contact us at:
                </p>
                <ul className="contact_info leading-relaxed mt-2">
                  <li className="flex  items-center">
                    <IoLocationSharp className="w-5 h-5 mr-1" />
                    Fatafat Sewa Private Limited
                  </li>
                  <li className="flex  items-center ml-5">
                    Jhamsikhel Road-3, Lalitpur
                  </li>
                  <li className="flex  items-center  ml-5">
                    Lalitpur, Bagmati, Nepal
                  </li>
                  <li className="flex  items-center ">
                    <TbMailFilled className="w-5 h-5 mr-1" />
                    info@fatafatsewa.com
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}
