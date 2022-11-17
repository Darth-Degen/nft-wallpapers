import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const PageHead: FC<Props> = (props: Props) => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
