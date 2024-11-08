// document.addEventListener('DOMContentLoaded', function () {
//     const calculateBtn = document.getElementById('calculate-btn');

//     calculateBtn.addEventListener('click', function () {
//         const percentage = parseFloat(document.getElementById('percentage').value);
//         const totalLectures = parseInt(document.getElementById('total-lectures').value);
//         const totalPresent = parseInt(document.getElementById('total-present').value);
//         const bonusAttendance = parseInt(document.getElementById('bonus-attendance').value);

//         const totalClasses = totalLectures + bonusAttendance;
//         const currentAttendance = (totalPresent + bonusAttendance) / totalClasses * 100;
//         let result = `Your current attendance is ${currentAttendance.toFixed(2)}%.`;

//         if (currentAttendance >= percentage) {
//             const canBunk = Math.floor((totalPresent + bonusAttendance - (percentage / 100 * totalClasses)) / (1 - percentage / 100));
//             result += `<br>You can bunk ${canBunk} more classes.`;
//             result += `<br>Your attendance will be ${(totalPresent + bonusAttendance - canBunk) / totalClasses * 100}% after bunking those classes.`;
//         } else {
//             const requiredAttendance = Math.ceil((percentage / 100) * totalClasses);
//             const classesNeeded = requiredAttendance - (totalPresent + bonusAttendance);
//             result += `<br>Your attendance is below the required ${percentage}%.`;
//             result += `<br>You need to attend ${classesNeeded} more classes to meet the criteria.`;
//         }

//         document.getElementById('result').innerHTML = result;
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', function () {
        const percentage = parseFloat(document.getElementById('percentage').value);
        const totalLectures = parseInt(document.getElementById('total-lectures').value);
        const totalPresent = parseInt(document.getElementById('total-present').value);
        const bonusAttendance = parseInt(document.getElementById('bonus-attendance').value);

        const totalClasses = totalLectures + bonusAttendance;
        const currentAttendance = ((totalPresent + bonusAttendance) / totalClasses) * 100;
        let result = `Your current attendance is ${totalPresent + bonusAttendance}/${totalClasses} → ${currentAttendance.toFixed(2)}%.`;

        if (currentAttendance >= percentage) {
            let classesToBunk = 0;
            let newAttendance = currentAttendance;

            while (newAttendance >= percentage) {
                classesToBunk++;
                newAttendance = ((totalPresent + bonusAttendance - classesToBunk) / totalClasses) * 100;
            }
            classesToBunk--;  // Subtract the last increment to get the correct number

            const finalAttendance = ((totalPresent + bonusAttendance - classesToBunk) / totalClasses) * 100;
            result += `<br>You can bunk ${classesToBunk} more classes.`;
            result += `<br>Your attendance will be ${totalPresent + bonusAttendance - classesToBunk}/${totalClasses} → ${finalAttendance.toFixed(2)}% after bunking those classes.`;
        } else {
            let additionalClasses = 0;
            let newAttendance = currentAttendance;

            while (newAttendance < percentage) {
                additionalClasses++;
                newAttendance = ((totalPresent + bonusAttendance + additionalClasses) / (totalClasses + additionalClasses)) * 100;
            }

            // result += `<br>Your attendance is below the required ${percentage}%.`;
            result += `<br>You need to attend ${additionalClasses} more classes to meet the criteria.`;
            result += `<br>Your attendance will be ${(totalPresent + bonusAttendance + additionalClasses)}/${(totalClasses + additionalClasses)} → ${newAttendance.toFixed(2)}%.`;
        }

        document.getElementById('result').innerHTML = result;
    });
});
