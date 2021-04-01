/* eslint-disable react/destructuring-assignment */
import { useRouter } from 'next/router';
import { graphql } from 'react-relay';
import { usePagination, useQuery } from 'relay-hooks';
import { Entity_blogSectionQuery } from 'src/__generated__/Entity_blogSectionQuery.graphql';
import ClientOnly from 'src/components/ClientOnly';
import PostCard from 'src/components/Dashboard/PostCard';
import GradientButton from 'src/components/GradientButton';
import Layout from 'src/components/Layout';
import { Row } from 'src/components/Layout/style';
import PlaceHolder from 'src/components/PlaceHolder';
import Sidebar from 'src/components/Sidebar';
import { match } from 'ts-pattern';

import { defaultIds } from '@vlepo/shared';

import { Container, DashboardCard, DashboardMain, Numbers, NumbersLabel } from './style';

const fragmentSpec = graphql`
  fragment Entity_user on User
  @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" })
  @refetchable(queryName: "PostRefetchQuery") {
    postsConnection(first: $count, after: $cursor) @connection(key: "UserPosts") {
      edges {
        node {
          ...PostCard_post
        }
      }
    }
  }
`;

const blogSectionQuery = graphql`
  query Entity_blogSectionQuery($id: String!) {
    blog(where: { id: $id }) {
      postViewCount
      postReactionCount
      postCommentCount
      userCount
    }
  }
`;

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const BlogSection = () => {
  const { error, data } = useQuery<Entity_blogSectionQuery>(blogSectionQuery, {
    id: defaultIds.blog,
  });

  if (error) return <div>{error.message}</div>;
  if (!data) return <PlaceHolder />;

  const { postViewCount, postReactionCount, postCommentCount, userCount } = data.blog
    ? data.blog
    : { postViewCount: 0, postReactionCount: 0, postCommentCount: 0, userCount: 0 };

  return (
    <Row width="100%">
      <DashboardCard width={[1, 1 / 2, 1 / 4]} m={[0, 3]}>
        <Numbers>{postViewCount}</Numbers>
        <NumbersLabel>Total post views</NumbersLabel>
      </DashboardCard>

      <DashboardCard width={[1, 1 / 2, 1 / 4]} m={[0, 3]}>
        <Numbers>{postReactionCount}</Numbers>
        <NumbersLabel>Total post reactions</NumbersLabel>
      </DashboardCard>

      <DashboardCard width={[1, 1 / 2, 1 / 4]} m={[0, 3]}>
        <Numbers>{postCommentCount}</Numbers>
        <NumbersLabel>Total post comments</NumbersLabel>
      </DashboardCard>

      <DashboardCard width={[1, 1 / 2, 1 / 4]} m={[0, 3]}>
        <Numbers>{userCount}</Numbers>
        <NumbersLabel>Total users</NumbersLabel>
      </DashboardCard>
    </Row>
  );
};

const PostSection = () => {
  const { data, isLoadingNext, hasNext, loadNext } = usePagination(fragmentSpec, props);

  return (
    <>
      <Row>
        <GradientButton width="5rem" ml="auto" mr="1rem">
          Create
        </GradientButton>
      </Row>
      {/* {
            e?.node && <PostCard key={((e.node as unknown) as { id: string }).id} post={e.node} />,
        } */}
    </>
  );
};

const Dashboard = () => {
  const router = useRouter();
  const entity = router.query.entity as string;

  return (
    <Layout>
      <Container>
        <Sidebar />
        <ClientOnly>
          <DashboardMain>
            {match(entity)
              .with('blog', () => <BlogSection />)
              .with('post', () => <PostSection />)
              .run()}
          </DashboardMain>
        </ClientOnly>
      </Container>
    </Layout>
  );
};

export default Dashboard;
