import LeadCaptureBase from './LeadCaptureBase';

export default function SleepingDatabaseCapture(props) {
  return (
    <LeadCaptureBase 
      {...props}
      abbreviation="SD"
      iconImg="/icon-sleeping-dragon.png"
      brandColor="#1E90FF"
      reportMockupImg="/report-mockup-bucket1.png"
    />
  );
}
