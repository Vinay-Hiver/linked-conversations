// A starting page: the HOT home layout with example content. Replace the content, or build a new page in src/pages/ and show it here.
import { Button } from './components/Button'
import { ConversationsSidebar } from './patterns/ConversationsSidebar'
import { sampleSections } from './patterns/ConversationsSidebar/sampleData'
import { MainNav } from './patterns/MainNav'
import { navSampleFooterItems, navSampleItems, navSampleUserMenu } from './patterns/MainNav/sampleData'
import { PageLayout } from './patterns/PageLayout'

export default function App() {
  return (
    <PageLayout
      variant="home"
      nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value="conversations" user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
      sidebar={<ConversationsSidebar sections={sampleSections(true, ['chat'])} value="chat-unassigned" />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, height: '100%' }}>
        <p style={{ margin: 0, font: 'var(--fontWeightMedium) 16px/24px var(--fontFamily)' }}>Your page goes here</p>
        <Button size="sm">Get started</Button>
      </div>
    </PageLayout>
  )
}
