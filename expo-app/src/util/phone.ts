import phone from 'phone';

/**
 * Given a phone number, return a E164 formatted version of that phone number.
 * Example: E164PhoneNumberFromString('+1 817 569 8900) => '+18175698900'
 */
export function E164PhoneNumberFromString(
    phoneNumberString: string,
    countryCode: string = 'USA'
): string {
    return phone(phoneNumberString, countryCode)[0];
}

/**
 * Given a E164 phone number, format it for display purposes.
 * Example: formatPhoneNumberForDisplay('+14084997157') => +1-408-499-7157
 */
export function formatPhoneNumberForDisplay(phoneNumber: string): string {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/(\d{1})\D?(\d{3})\D?(\d{3})\D?(\d{4})/, '$1-$2-$3-$4');
}
