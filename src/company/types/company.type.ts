import { VacancyResponse } from '../../vacancy/types/vacancy.type';

export class CompanyResponse {
  id: string;
  title: string;
  vacancies?: VacancyResponse[];
}
