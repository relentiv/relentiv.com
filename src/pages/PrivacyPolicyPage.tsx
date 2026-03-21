import LegalPageLayout from '../components/LegalPageLayout';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Last updated March 22, 2026. This policy explains what data Relentiv collects, how it is used, and how to contact us about privacy requests."
      path="/privacy-policy"
      breadcrumbs={[
        {name: 'Home', path: '/'},
        {name: 'Privacy Policy', path: '/privacy-policy'},
      ]}
    >
      <h2>1. Introduction</h2>
      <p>Relentiv respects your privacy and handles personal information in a limited, purpose-driven way. This policy applies to information collected through our website, intake forms, and project communications.</p>

      <h2>2. Information We Collect</h2>
      <p>We may collect contact details, company information, project requirements, and analytics data when you submit forms, request a consultation, or interact with the site.</p>
      <ul>
        <li>Contact information such as name, email address, and company name.</li>
        <li>Project details you voluntarily provide through consultation or contact forms.</li>
        <li>Usage and device information collected through analytics after consent is granted.</li>
      </ul>

      <h2>3. How We Use Information</h2>
      <p>We use collected information to respond to inquiries, evaluate project fit, improve website performance, and support ongoing client communication. We do not sell personal data.</p>

      <h2>4. Data Retention</h2>
      <p>We retain inquiry and project information for as long as needed to manage business operations, satisfy contractual obligations, and meet legal or compliance requirements.</p>

      <h2>5. Your Rights</h2>
      <p>You may request access, correction, or deletion of your personal information by contacting us. Where applicable, you may also object to processing or request data portability.</p>

      <h2>6. Contact</h2>
      <p>For privacy-related questions or requests, contact Relentiv at contact@relentiv.com.</p>
    </LegalPageLayout>
  );
}
