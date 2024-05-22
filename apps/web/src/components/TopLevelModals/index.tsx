import { useWeb3React } from '@web3-react/core'
import AddressClaimModal from 'components/claim/AddressClaimModal'
import DevFlagsBox from 'dev/DevFlagsBox'
import useAccountRiskCheck from 'hooks/useAccountRiskCheck'
import TransactionCompleteModal from 'nft/components/collection/TransactionCompleteModal'
import { useModalIsOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { isDevelopmentEnv, isStagingEnv } from 'utils/env'

export default function TopLevelModals() {
  const addressClaimOpen = useModalIsOpen(ApplicationModal.ADDRESS_CLAIM)
  const addressClaimToggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  const blockedAccountModalOpen = useModalIsOpen(ApplicationModal.BLOCKED_ACCOUNT)
  const { account } = useWeb3React()
  useAccountRiskCheck(account)
  const accountBlocked = Boolean(blockedAccountModalOpen && account)
  const shouldShowDevFlags = isDevelopmentEnv() || isStagingEnv()

  return (
    <>
      <AddressClaimModal isOpen={addressClaimOpen} onDismiss={addressClaimToggle} />
      {/* <ConnectedAccountBlocked account={account} isOpen={accountBlocked} /> */}
      {/* <Bag /> */}
      {/* <UniwalletModal /> */}

      {/* <Banners /> */}

      {/* <OffchainActivityModal /> */}
      <TransactionCompleteModal />
      {/* <AirdropModal /> */}
      {/* <FiatOnrampModal /> */}
      {/* <UkDisclaimerModal /> */}
      {/* <GetTheAppModal /> */}
      {/* <PrivacyPolicyModal /> */}
      {/* <FeatureFlagModal /> */}
      {shouldShowDevFlags && <DevFlagsBox />}
    </>
  )
}
