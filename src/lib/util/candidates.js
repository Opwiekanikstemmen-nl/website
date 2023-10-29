export function groupByParty(candidates) {
	if(!candidates || candidates.length < 1) return null;

	const grouped = candidates.reduce((acc, candidate) => {
		if(!acc[candidate.verkiezingen.tk2023.partij_naam]) {
			acc[candidate.verkiezingen.tk2023.partij_naam] = [];
		}

		acc[candidate.verkiezingen.tk2023.partij_naam].push(candidate);

		return acc;
	}, {})

	Object.keys(grouped).forEach((key) => {
		grouped[key].sort((a, b) => {
			if (a.verkiezingen.tk2023.lijstnummer < b.verkiezingen.tk2023.lijstnummer) return -1;
			if (a.verkiezingen.tk2023.lijstnummer > b.verkiezingen.tk2023.lijstnummer) return 1;
			return 0;
		});
	});

	return grouped;

}

export function slugify(string, prefix = '') {
	return prefix + string.toString().toLowerCase().trim().replace("'", "").replace(/[\s\W-]+/g, '-')
  }

export function getAge(dateString) {
	if (dateString === null) return null;

	dateString = dateString.replace('+', '');
	
	const today = new Date();
	const birthDate = new Date(dateString);
	const months = today.getMonth() - birthDate.getMonth();
	let age = today.getFullYear() - birthDate.getFullYear();

	if ( (months === 0 && today.getDate() < birthDate.getDate()) ||
		months < 0 ) {
		age--;
	}

	return age;
}