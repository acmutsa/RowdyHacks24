import Link from "next/link"
export default function Past(){
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center space-y-3">
      <div className="flex flex-col w-full max-w-5xl items-center justify-center space-y-5">
        <h1 className="text-4xl font-black">RowdyHacks IX has passed</h1>
        <div className="flex flex-col items-center justify-center max-w-3xl">
          <p className="text-center text-lg">
            This event has now passed and only the home page is
            accessible for now. We are working on allowing for data from this
            hackathon to be accessed soon.
          </p>
          <p className="text-center text-lg">Thank you for your patience</p>
        </div>
      </div>
      <Link href="/" className="underline text-lg">Return to Home Page</Link>
    </div>
  );
}