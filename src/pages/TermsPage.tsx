import LegalPageLayout from '../components/LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="Last updated March 22, 2026. These terms govern use of the Relentiv website, inquiry forms, and project engagement materials."
      path="/terms"
      breadcrumbs={[
        {name: 'Home', path: '/'},
        {name: 'Terms of Service', path: '/terms'},
      ]}
    >
      <h2>1. Acceptance of Terms</h2>
      <p>By using the Relentiv website, you agree to these terms and to any additional terms that may apply to specific services or project engagements.</p>

      <h2>2. Website Use</h2>
      <p>You may use this website for lawful business and informational purposes only. You agree not to misuse forms, interfere with site operations, or attempt unauthorized access to any systems.</p>

      <h2>3. Proposals and Engagements</h2>
      <p>Website content does not create a contractual relationship. Project scopes, fees, deliverables, and timelines are defined only through signed proposals, statements of work, or service agreements.</p>

      <h2>4. Intellectual Property</h2>
      <p>Unless otherwise stated, the content, branding, and materials on this site are owned by Relentiv or used with permission. You may not reproduce or redistribute them without written approval.</p>

      <h2>5. Limitation of Liability</h2>
      <p>The website is provided on an as-is basis. Relentiv is not liable for indirect, incidental, or consequential damages arising from use of the site or reliance on public-facing content.</p>

      <h2>6. Contact</h2>
      <p>Questions about these terms can be sent to contact@relentiv.com.</p>
    </LegalPageLayout>
  );
}
