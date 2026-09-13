import LeadCaptureBase from './LeadCaptureBase';

export default function VolcanoCapture(props) {
  return (
    <LeadCaptureBase 
      {...props}
      abbreviation="GI"
      iconImg="/icon-untapped-volcano.png"
      brandColor="#10B981"
      reportMockupImg="/report-mockup-bucket4.png"
    />
  );
}
