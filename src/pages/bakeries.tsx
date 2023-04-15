import { useBakery } from "~/lib/hooks";

export default function Bakeries() {
  const { data: bakeries } = useBakery().findMany({});

  if (bakeries) {
    return bakeries.map((bakery) => {
      return <div key={bakery.id}>{bakery.name}</div>;
    });
  } else {
    return <>Loading ...</>;
  }
}
