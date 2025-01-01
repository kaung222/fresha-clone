export type Mail = {
    createdAt: string; // ISO 8601 date string for when the confirmation was created
    id: string; // UUID of the confirmation
    orgId: number; // Organization ID
    mailTo: string;
    sent_by: string | null; // ID or name of the sender, or null if not sent by a specific person
    subject: string; // Subject of the confirmation
    text: string; // Confirmation message text
    to: string[]; // Array of recipient email addresses
    updatedAt: string; // ISO 8601 date string for the last update
};