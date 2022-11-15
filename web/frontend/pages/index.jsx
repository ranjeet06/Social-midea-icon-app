import {
  Page,
  Layout,
  Heading,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import './style.css';

import { GeneralSetting, SocialMediaSetting } from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar
        title="Social Midea Icon"
        primaryAction={{
          content: "Save",
          onAction: null,
        }}
        secondaryActions={[
          {
            content: "Help center",
            onAction: null,
          },
        ]}
      />

      <Layout>

        <Layout.Section>
          <Heading>Social bar - social midia icons</Heading>
        </Layout.Section>

        <Layout.Section>
          <Banner title="About the app" status="info" >
            <p>This app adds social midia icons of your choice.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section oneThird>
          <GeneralSetting />
        </Layout.Section>
        <Layout.Section oneThird>
          <SocialMediaSetting />
        </Layout.Section>

      </Layout>
    </Page>
  );
}
