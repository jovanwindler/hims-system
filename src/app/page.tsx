import TabLayout from '@/components/TabLayout';
import BusinessTab from '@/components/BusinessTab';
import PolicyConfig from '@/components/PolicyConfig';
import AboutTab from '@/components/AboutTab';

export default function Home() {
  return (
    <TabLayout>
      <BusinessTab />
      <PolicyConfig />
      <AboutTab />
    </TabLayout>
  );
}