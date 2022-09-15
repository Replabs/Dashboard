
/**
 * Data pertaining to an assessment.
 */
export type AssessmentData = {
    text: string;
    similarity: number;
}

/**
 * The edge between two DAO users.
 */
export type DaoEdge = {
    id: string;
    from: string;
    to: string;
    assessments: AssessmentData[];
    value: number;
  };
  
  /**
   * Data pertaining to a DAO user.
   */
  export type DaoNode = {
    id: string;
    label: string;
    title: string;
    value: number;
  }
  