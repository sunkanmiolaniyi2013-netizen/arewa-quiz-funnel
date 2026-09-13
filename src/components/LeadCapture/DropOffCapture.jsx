import LeadCaptureBase from './LeadCaptureBase';

export default function DropOffCapture(props) {
  return (
    <LeadCaptureBase 
      {...props}
      abbreviation="48H"
      iconImg="/icon-48hr-cliff.png"
      brandColor="#E6B800"
      reportMockupImg="/report-mockup-bucket2.png"
    />
  );
}
