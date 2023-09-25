export const today = new Date();

export function getAge(dateString) {
    if (dateString === null) return null;

    const birthDate = new Date(dateString);
    const months = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if ( (months === 0 && today.getDate() < birthDate.getDate()) ||
        months < 0 ) {
        age--;
    }

    return age;
}