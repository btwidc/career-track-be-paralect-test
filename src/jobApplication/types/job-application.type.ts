import { CandidateResponse } from '../../candidate/types/candidate.type';
import { VacancyResponse } from '../../vacancy/types/vacancy.type';

export class JobApplicationResponse {
  id: string;
  status: string;
  note?: string;
  vacancyId?: string;
  candidateId?: string;
  vacancy?: VacancyResponse;
  candidate?: CandidateResponse;
}
    