import { FC, useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import TableHandbook from "../../components/TableHandbook";

import handbook from "../../apollo/handbooks";





const Correspondent: FC = () => {
        const [page, setPage] = useState(1)
        const { data, loading } = useQuery(handbook.correspondent,
                {
                        variables: {
                                name: '',
                                offset: (page - 1) * 20
                        },
                }
        )

        const dataSource: [string, string, string][] = useMemo(() => {
                const array = data?.correspondents?.results?.map((item: any) => [item?.code, item?.nameRu, item?.nameKz])
                return array || []
        }, [data])

        return (
                <TableHandbook
                        page={page}
                        total={data?.correspondents?.totalCount}
                        col_one="Код организации"
                        col_two="Наименование (рус)"
                        col_desc="Наименование (каз)"
                        data={dataSource}
                        setPage={setPage}
                />
        )
}

export default Correspondent