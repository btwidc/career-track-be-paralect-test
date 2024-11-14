export interface IncludeVacancyFields {
  vacancies: {
    select: {
      id: boolean;
      title: boolean;
      salaryFork: boolean;
    };
  };
}
    