import TeamMember from "./TeamMember";
import { useGetTeamQuery } from "../../../features/teams/teamApi";

export default function TeamMembers() {
  const { data: members, isLoading, isError, error } = useGetTeamQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && members?.length === 0) {
    content = <div>Team members not found!</div>;
  } else if (!isLoading && !isError && members?.length > 0) {
    content = members.map((teamMember) => (
      <TeamMember key={teamMember.id} teamMember={teamMember} />
    ));
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
