const { FileCreateTransaction, ContractCreateTransaction, ContractFunctionParameters } = require("@hashgraph/sdk");
const fs = require('fs');
const hederaClient = require('./hederaClient.ts');

async function deployContract() {
  try {
    const bytecode = fs.readFileSync('./build/src_services_basicCampaign_sol_BasicCampaign.bin');
    
    const fileTx = await new FileCreateTransaction()
      .setContents(bytecode)
      .execute(hederaClient); // Use a variável renomeada
    
    const fileReceipt = await fileTx.getReceipt(hederaClient);
    const bytecodeFileId = fileReceipt.fileId;

    const contractTx = new ContractCreateTransaction()
      .setBytecodeFileId(bytecodeFileId)
      .setGas(100000)
      .setConstructorParameters(
        new ContractFunctionParameters().addString("Hello, Hedera!")
      );

    const contractResponse = await contractTx.execute(hederaClient);
    const contractReceipt = await contractResponse.getReceipt(hederaClient);
    const contractId = contractReceipt.contractId;

    console.log("ID do contrato inteligente: " + contractId);
    return contractId;
  } catch (error) {
    console.error("Erro ao deployar o contrato:", error);
    throw error;
  }
}

deployContract().then(contractId => {
    console.log(`Contract deployed with ID: ${contractId}`);
});
