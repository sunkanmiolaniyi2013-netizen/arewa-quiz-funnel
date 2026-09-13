import LeadCaptureBase from './LeadCaptureBase';

export default function GhostCapture(props) {
  return (
    <LeadCaptureBase 
      {...props}
      abbreviation="VG"
      iconImg="/icon-vanishing-ghost.png"
      brandColor="#8B5CF6"
      reportMockupImg="/report-mockup-bucket3.png"
    />
  );
}
