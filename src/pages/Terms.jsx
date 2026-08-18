import React from "react";
import LegalLayout from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 18, 2026">
      <p>
        Welcome to SL Now. By using this application, you agree to these
        Terms of Service. If you do not agree with any part of these terms,
        please do not use the app.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Description of Service</h2>
      <p>
        SL Now is a free tool that converts English text into American
        Sign Language video animations. The service retrieves publicly available
        ASL demonstration videos from third-party sources (such as SignASL.org)
        and plays them back in sequence.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Educational Purpose</h2>
      <p>
        The translations and videos provided by this app are for educational and
        informational purposes only. ASL is a rich, context-dependent language
        with its own grammar and regional variation. The simplified
        word-by-word translations produced by this tool are not a substitute for
        fluent ASL instruction, professional interpretation, or communication
        with Deaf individuals.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Third-Party Content</h2>
      <p>
        ASL demonstration videos are sourced from third-party websites. We do
        not own or control this content, and we are not responsible for its
        accuracy, availability, or completeness. All third-party trademarks and
        content remain the property of their respective owners.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Use the app for any unlawful purpose.</li>
        <li>Attempt to disrupt or reverse-engineer the service.</li>
        <li>Misrepresent the translations as professional ASL interpretation.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Disclaimer of Warranties</h2>
      <p>
        The app is provided "as is" without warranties of any kind, express or
        implied, including but not limited to accuracy, reliability, or fitness
        for a particular purpose.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, we shall not be liable for any
        indirect, incidental, or consequential damages arising from your use of
        or inability to use the app.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the app
        after changes constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact</h2>
      <p>
        If you have questions about these Terms, please contact Base44 support.
      </p>
    </LegalLayout>
  );
}