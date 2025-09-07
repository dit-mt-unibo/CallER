export default {
     

   generateQuestionSet(array) {
    /*
          - genera un set random di domande per questa sessione
  - costruisci il cookie con uuid e set di domande
      - salva cookie
  - genera link alla prima domanda
    */

    function getRandomSubarray(arr, size) {
      var shuffled = arr.slice(0), i = arr.length, temp, index;
      while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(0, size);
    }
   
    let size = Math.min(5, array.length);

    let questionsSet = getRandomSubarray(array, size);
    return questionsSet;
  },
}
