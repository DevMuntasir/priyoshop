/** Contact form submission stored in the `contact_submission` collection. */
export type ContactSubmissionDoc = {
  submissionId: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};
