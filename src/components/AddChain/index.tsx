import styled from 'styled-components/macro'

import DegenChain from '../../assets/images/degen-chain.jpeg'

const StyledAddChainButton = styled.button`
  display: flex;
  gap: 0.75rem;
  background: transparent;
  border: none;
  color: white;
  text-decoration: underline;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: pointer;
`

export default function AddDegenChain() {
  const addDegenChainHandler = async () => {
    try {
      if (window.ethereum && window.ethereum?.request) {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x27bc86aa',
              chainName: 'Degen Chain',
              rpcUrls: ['https://rpc.degen.tips'],
              nativeCurrency: {
                name: 'Degen',
                symbol: 'DEGEN',
                decimals: 18,
              },
              blockExplorerUrls: ['https://explorer.degen.tips'],
            },
          ],
        })
      } else {
        throw new Error('MetaMask not detected or request method not available')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledAddChainButton onClick={addDegenChainHandler}>
      <img src={DegenChain} width={20} height={20} alt="Degen Chain Logo" style={{ borderRadius: '100px' }} />
      Add Degen Chain
    </StyledAddChainButton>
  )
}
