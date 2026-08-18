import React from "react";
import LegalLayout from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 18, 2026">
      <p>
        This Privacy Policy describes how SL Now handles information when
        you use the application. We are committed to protecting your privacy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Do Not Collect</h2>
      <p>
        SL Now is designed with privacy in mind. We do not require you to
        create an account, and we do not collect personally identifiable
        information about you when you use the translation tool. The text you
        enter is processed locally in your browser to generate sign sequences.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Video Lookups</h2>
      <p>
        When the app looks up an ASL demonstration video, the word you typed is
        sent to our backend function, which retrieves the video URL from a
        third-party source (SignASL.org). The word itself is used solely to find
        the correct video and is not stored or linked to your identity.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Local Storage</h2>
      <p>
        Your preferences — such as signing speed and accessibility settings —
        are saved in your browser's local storage. This data never leaves your
        device and can be cleared at any time through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Third-Party Services</h2>
      <p>
        Video content is delivered from third-party servers (e.g.,
        media.signbsl.com). These providers may log standard technical request
        data (such as IP address) in accordance with their own privacy policies.
        We do not control how third parties handle this data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Cookies</h2>
      <p>
        SL Now does not use tracking cookies. Local storage is used
        exclusively for saving your in-app preferences.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Children's Privacy</h2>
      <p>
        The app is suitable for general audiences. We do not knowingly collect
        any data from children or any other users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        reflected on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please contact Base44
        support.
      </p>
    </LegalLayout>
  );
}