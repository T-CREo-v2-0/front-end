/* Function to verify if the sum of the weights is equal to 1
 * @param ListOfWeights: list of weights to be verified
 * @return true if the sum of the weights is equal to 1, false otherwise
 */
function VerifySum(ListOfWeights: number[]) {
  let TotalSum = 0;

  for (let i = 0; i < ListOfWeights.length; i++) {
    TotalSum += +ListOfWeights[i];
  }

  return TotalSum === 1;
}

export { VerifySum };
