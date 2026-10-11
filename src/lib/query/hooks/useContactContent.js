import { useSanityQuery } from './useSanityQuery';
import { contactContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Contact section copy — intro, inquiry form field labels,
 * and success-state copy.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, headline: string, introText: string,
 *   formHeading: string, startPrompt: string, resetLabel: string, cancelLabel: string,
 *   categoryModalDoneLabel: string, categoryModalClearLabel: string,
 *   categoryRequiredError: string, categoryBookingLabel: string, categoryServiceLabel: string,
 *   categoryTestimonialLabel: string, categoryOtherLabel: string,
 *   nameFieldPlaceholder: string, emailFieldPlaceholder: string,
 *   phoneFieldPlaceholder: string, serviceFieldPlaceholder: string,
 *   serviceRequiredError: string, serviceModalDoneLabel: string, serviceModalClearLabel: string,
 *   timeSlotFieldPlaceholder: string, timeSlotAddLabel: string,
 *   timeSlotModalDoneLabel: string, timeSlotModalClearLabel: string,
 *   timeSlotStartHour: number, timeSlotEndHour: number,
 *   messageFieldPlaceholder: string, submitButtonLabel: string,
 *   successHeadline: string, successMessage: string
 * }>}
 */
export function useContactContent() {
  return useSanityQuery('contactContent', contactContentQuery);
}
