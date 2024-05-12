import CreateToken from 'components/TokenCreator/CreateToken'
import AppBody from 'pages/AppBody'

export default function Launch() {
  return (
    <AppBody>
      <div style={{ margin: '0.5rem' }}>
        <CreateToken />
      </div>
    </AppBody>
  )
}
