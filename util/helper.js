export function formatDate(ms){
   // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.floor(seconds % 60);
    return( hours.toString().padStart(2, "0")+":"+minutes.toString().padStart(2, "0")+":"+seconds.toString().padStart(2, "0"));
}