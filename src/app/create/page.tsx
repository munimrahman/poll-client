import PollForm from "../../components/PollForm";

export default function CreatePollPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Poll</h1>
      <PollForm />
    </div>
  );
}
