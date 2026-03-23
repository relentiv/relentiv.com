import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Moon } from "lucide-react";
import PageSeo from "../components/PageSeo";

export default function PrivacyPolicyPage() {
  const [, setLocation] = useLocation();
  const [readingMode, setReadingMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        readingMode ? "bg-[#fdf6e3] text-[#433f38]" : "bg-[#050505] text-gray-300"
      }`}
    >
      <PageSeo
        title="Privacy Policy"
        description="Read Relentiv's privacy policy and learn how information is handled across our website and services."
        path="/privacy-policy"
      />

      {/* Header Section */}
      <header className="relative w-full pt-32 pb-20 overflow-hidden border-b border-white/5">
        {!readingMode && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-[#050505] to-[#050505] opacity-80"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </>
        )}

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <button
            onClick={() => setLocation("/")}
            className={`mb-12 flex items-center gap-2 text-sm font-medium transition-colors ${
              readingMode
                ? "text-[#837a6b] hover:text-[#433f38]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-sm font-semibold uppercase tracking-wider ${
                readingMode ? "text-[#b58900]" : "text-zinc-400"
              }`}
            >
              Legal
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6 ${
              readingMode ? "text-[#073642]" : "text-white"
            }`}
          >
            Privacy Policy
          </h1>

          <p
            className={`text-xl leading-relaxed ${
              readingMode ? "text-[#586e75]" : "text-gray-400"
            }`}
          >
            Last updated: March 19, 2026. Please read this privacy policy carefully before using our website or services.
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          readingMode
            ? "bg-[#fdf6e3]/90 border-[#eee8d5]"
            : "bg-[#050505]/80 border-white/5"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-end">
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              readingMode
                ? "bg-[#eee8d5] text-[#586e75] hover:bg-[#e4dfcb]"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
            title="Toggle Reading Mode"
          >
            {readingMode ? (
              <>
                <Moon className="w-4 h-4" /> Dark Mode
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" /> Reading Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <article
          className={`prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed
            ${
              readingMode
                ? "prose-headings:text-[#073642] prose-p:text-[#433f38] prose-strong:text-[#073642] prose-li:text-[#433f38]"
                : "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300"
            }
          `}
        >

          <h2>1. Introduction</h2>
          <p>
            Relentiv ("we," "us," or "our") is a Registered Partnership Firm with MSME/Udyam Registration, having its principal place of business at Kudlu Gate, Bengaluru, Karnataka, India 560068. We operate the website at <strong>relentiv.com</strong> and provide technology engineering and digital transformation services, including web application development, mobile application development, and game engineering.
          </p>
          <p>
            This Privacy Policy explains what personal information we collect, why we collect it, how we use and protect it, and what rights you have in relation to it. By accessing or using our website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with any part of this policy, please do not use our website or submit any personal information to us.
          </p>
          <p>
            This policy applies to all visitors to relentiv.com, prospective clients who contact us, and clients who engage us for services. It does not apply to third-party websites or services that may be linked from our website.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect information in two ways: information you provide to us directly, and information collected automatically when you use our website.
          </p>
          <p><strong>Information you provide directly:</strong></p>
          <ul>
            <li>Name, email address, phone number, and company name when you fill out a contact or inquiry form on our website.</li>
            <li>Project details, requirements, and any other information you voluntarily share with us during pre-sales discussions or discovery calls.</li>
            <li>Business information, including company address, jurisdiction, and legal entity details, when entering into a contract or Statement of Work with us.</li>
            <li>Payment-related information such as billing name, address, and bank or wire transfer details necessary to process transactions. We do not store credit card numbers or payment card data directly.</li>
            <li>Communications you send to us via email, contact forms, or other channels, including any attachments or materials you provide.</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul>
            <li>IP address, browser type and version, operating system, referring URL, and pages visited on our website.</li>
            <li>Date and time of your visit, time spent on pages, and click-through data.</li>
            <li>Device identifiers and approximate geographic location derived from your IP address.</li>
            <li>Cookies and similar tracking technologies as described in Section 8 of this policy.</li>
          </ul>
          <p>
            We do not intentionally collect sensitive personal information such as government identification numbers, financial account credentials, health data, or information about racial or ethnic origin, political opinions, religious beliefs, or biometric data. Please do not submit such information to us through our website or contact forms.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Responding to inquiries:</strong> To contact you in response to a question, request, or proposal submission you have sent to us.</li>
            <li><strong>Evaluating project fit:</strong> To assess whether we are the right partner for your project, prepare proposals, and enter into contracts.</li>
            <li><strong>Delivering services:</strong> To perform the technology services agreed upon in a Statement of Work or Master Service Agreement, including communicating with you throughout the project lifecycle.</li>
            <li><strong>Processing payments:</strong> To issue invoices, process wire transfers, and maintain records of financial transactions in accordance with our payment terms.</li>
            <li><strong>Legal compliance:</strong> To comply with applicable Indian laws and regulations, including tax obligations under the Income Tax Act and GST legislation, and to maintain records as required by law.</li>
            <li><strong>Improving our website:</strong> To understand how visitors use relentiv.com, identify technical issues, and improve content and performance.</li>
            <li><strong>Security:</strong> To detect, investigate, and prevent fraudulent, unauthorized, or illegal activity.</li>
            <li><strong>Portfolio and marketing:</strong> To reference your company name and a general description of the engagement in our portfolio and case studies, subject to your right to opt out as described in Section 10.</li>
          </ul>
          <p>
            We will never sell, rent, or trade your personal information to third parties for their own marketing purposes. We do not use your information to serve targeted advertisements.
          </p>

          <h2>4. Legal Basis for Processing</h2>
          <p>
            We process your personal information on the following legal grounds:
          </p>
          <ul>
            <li><strong>Contractual necessity:</strong> Processing necessary to enter into or perform a contract with you, including pre-contractual discussions and the delivery of agreed services.</li>
            <li><strong>Legitimate interests:</strong> Processing necessary for our legitimate business interests, including responding to inquiries, improving our website, maintaining the security of our systems, and marketing our services to prospective clients — provided these interests are not overridden by your rights.</li>
            <li><strong>Legal obligation:</strong> Processing necessary to comply with applicable Indian laws, including tax, accounting, and regulatory requirements.</li>
            <li><strong>Consent:</strong> Where we rely on your consent (for example, if we send you marketing communications), you may withdraw that consent at any time by contacting us at hello@relentiv.com.</li>
          </ul>

          <h2>5. Information Sharing and Disclosure</h2>
          <p>
            We do not sell or share your personal information with third parties except in the following limited circumstances:
          </p>
          <ul>
            <li><strong>Service providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, delivering services, or processing payments — such as cloud hosting providers, email platforms, and project management tools. These providers are bound by contractual obligations to keep your information confidential and to use it only for the purposes we specify.</li>
            <li><strong>Professional advisors:</strong> We may share information with our lawyers, accountants, or auditors where necessary to conduct our business, comply with legal obligations, or resolve disputes.</li>
            <li><strong>Legal requirements:</strong> We may disclose your information if required to do so by applicable law, regulation, court order, or governmental authority, or to protect the rights, property, or safety of Relentiv, our clients, or others.</li>
            <li><strong>Business transfers:</strong> In the event of a merger, restructuring, or transfer of all or part of Relentiv's business, your information may be transferred as part of that transaction, subject to equivalent privacy protections.</li>
          </ul>
          <p>
            We do not disclose client project details, source code, business plans, or confidential information shared during engagements to any third party without your written consent, consistent with our confidentiality obligations under our Master Service Agreement and Non-Disclosure Agreement.
          </p>

          <h2>6. International Transfers of Data</h2>
          <p>
            Relentiv is based in India and our primary data processing occurs in India. However, because we serve clients in the United States, the United Arab Emirates, and other countries, information you provide to us may be transmitted internationally. When we transfer data outside India, we take appropriate steps to ensure that such transfers are made in compliance with applicable law and that your information is protected by adequate safeguards.
          </p>
          <p>
            If you are located in a jurisdiction with specific data transfer restrictions (such as the European Economic Area), please contact us at hello@relentiv.com before submitting personal information, and we will provide appropriate information about the safeguards applicable to your data.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by applicable law.
          </p>
          <ul>
            <li><strong>Inquiry and pre-sales data:</strong> Retained for up to 2 years from the date of last contact if no engagement is initiated, so that we may respond to any follow-up communications.</li>
            <li><strong>Client project data:</strong> Retained for the duration of the engagement plus 7 years thereafter, in compliance with Indian accounting, tax, and legal requirements.</li>
            <li><strong>Financial and invoice records:</strong> Retained for a minimum of 8 years as required under Indian tax law.</li>
            <li><strong>Website analytics data:</strong> Retained in aggregated or anonymised form for up to 2 years.</li>
          </ul>
          <p>
            When personal information is no longer needed, we securely delete or anonymise it.
          </p>

          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to improve your browsing experience, analyse website traffic, and understand visitor behaviour. Cookies are small text files placed on your device.
          </p>
          <p>We may use the following types of cookies:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Necessary for the website to function correctly. These cannot be disabled.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website, such as which pages are visited most often. We may use tools such as Google Analytics for this purpose. Data collected is aggregated and anonymised where possible.</li>
            <li><strong>Preference cookies:</strong> Remember your settings and preferences, such as reading mode or language selection.</li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website. We do not use cookies to serve advertising or track you across third-party websites.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We take the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your information against unauthorised access, accidental loss, alteration, or disclosure. These measures include encrypted data transmission (HTTPS), access controls, and secure storage practices.
          </p>
          <p>
            However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security. If you believe your information has been compromised, please contact us immediately at hello@relentiv.com.
          </p>

          <h2>10. Your Rights</h2>
          <p>
            Depending on your location and applicable law, you may have the following rights with respect to your personal information:
          </p>
          <ul>
            <li><strong>Right of access:</strong> You may request a copy of the personal information we hold about you.</li>
            <li><strong>Right to rectification:</strong> You may request that we correct any inaccurate or incomplete information we hold about you.</li>
            <li><strong>Right to erasure:</strong> You may request that we delete your personal information, subject to our legal obligations to retain certain records.</li>
            <li><strong>Right to object:</strong> You may object to our processing of your personal information where we rely on legitimate interests as the legal basis.</li>
            <li><strong>Right to restrict processing:</strong> You may request that we limit how we use your information in certain circumstances.</li>
            <li><strong>Right to data portability:</strong> Where technically feasible, you may request your information in a structured, commonly used, machine-readable format.</li>
            <li><strong>Right to withdraw consent:</strong> Where we process your information on the basis of consent, you may withdraw that consent at any time without affecting the lawfulness of processing prior to withdrawal.</li>
            <li><strong>Portfolio opt-out:</strong> If you are a current or former client, you may request at any time that we remove your company name and project details from our portfolio or marketing materials by contacting us in writing.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <strong>hello@relentiv.com</strong>. We will respond to your request within 30 days. We may need to verify your identity before processing your request.
          </p>

          <h2>11. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites, tools, or platforms. This Privacy Policy does not apply to those external sites. We are not responsible for the privacy practices of any third-party website and encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2>12. Children's Privacy</h2>
          <p>
            Our website and services are intended for business use and are not directed at children under the age of 18. We do not knowingly collect personal information from anyone under 18. If you believe we have inadvertently collected such information, please contact us at hello@relentiv.com and we will promptly delete it.
          </p>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website or services after any changes constitutes your acceptance of the updated policy.
          </p>

          <h2>14. Governing Law</h2>
          <p>
            This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising in connection with this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.
          </p>

          <h2>15. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> hello@relentiv.com</li>
            <li><strong>Website:</strong> relentiv.com</li>
            <li><strong>Address:</strong> Relentiv, Kudlu Gate, Bengaluru, Karnataka, India 560068</li>
          </ul>
          <p>
            We are committed to resolving any privacy-related concerns promptly and in good faith. If you are not satisfied with our response, you may have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.
          </p>

        </article>
      </main>
    </div>
  );
}