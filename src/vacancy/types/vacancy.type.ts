export class VacancyResponse {
  id: string;
  title: string;
  salaryFork: string;
  companyId?: string;
  company?: {
    id?: string;
    title?: string;
  }
}
  