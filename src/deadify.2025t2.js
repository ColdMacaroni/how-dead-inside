(() => {
	function getWeek() {
		// The uni week without factoring out holidays/breaks
		// see https://www.epochconverter.com/weeks/2025 (or current year) to help you here
		// dates from https://www.wgtn.ac.nz/students/study/dates
		let weekNum = getWeekOfYear(new Date());
		// The exact week the trimester started, not the one before.
		const startWeek = 28;
		const breakFirstWeek = 34;

		// Mid-term break
		if (weekNum == breakFirstWeek || weekNum == breakFirstWeek + 1) {
			// let's just return the last week of first half
			return breakFirstWeek - startWeek;
		} else if (weekNum > breakFirstWeek + 1) {
			weekNum -= 2;
		}

		return weekNum - startWeek + 1;

		function getWeekOfYear(date) {
			const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
			const dayNum = d.getUTCDay() || 7;
			d.setUTCDate(d.getUTCDate() + 4 - dayNum);
			const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
			return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
		}
	}

	function getDeadnessFeeling(week) {
		// This is put *directly* onto the DOM so no user input here please
		if (week < 1) return `getting set to get rekt!`
		if (week <= 3) return `gathering strength, courage, and caffeine for what's about to come.`
		if (week <= 6) return `trying to try your best o7.`
		return `embracing dark magic!<br /><img src="https://i.imgur.com/PtmRbyL.gif" />`
	}

	const weekNum = getWeek();
	const deadnessFeeling = getDeadnessFeeling(weekNum);

	try {
		updateDom({
			weekNum,
			deadnessFeeling
		});
	} catch (e) {
		console.error(e);
		alert(e);
	}

	function updateDom(state) {
		// Get required objects and freak out like Gordon Ramsey if we can't
		const { weekNum, deadnessFeeling } = state;
		const weekNumEl = document.querySelector('.deadness__week-number');
		const deadnessFeelingEl = document.querySelector('.deadness__feeling');

		if (!weekNum || !deadnessFeeling) {
			throw `You didn't give me the state I asked for.`
		}

		if (!weekNumEl || !deadnessFeelingEl) {
			throw `Nick is either a bad dev or your web browser is bad. I can't get the elements in the DOM.`;
		}

		weekNumEl.innerText = weekNum;
		deadnessFeelingEl.innerHTML = deadnessFeeling;
	}
})();
