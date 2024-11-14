export interface IncludeCandidateAndVacancyFields {
  vacancy: {
    select: {
      id: boolean;
      title: boolean;
      salaryFork: boolean;
      companyId: boolean;
      company: {
        select: {
          id: boolean;
          title: boolean;
        };
      };
    };
  };
  candidate: boolean;
}
