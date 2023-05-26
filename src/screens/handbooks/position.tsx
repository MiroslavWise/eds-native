import { FC, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import TableHandbook from "components/TableHandbook";

import handbook from "apollo/handbooks";

const Position: FC = () => {
        const [page, setPage] = useState(1)
        const { data, loading } = useQuery(handbook.position)

        const dataSource: [string, string, string][] = useMemo(() => {
                const array = data?.positions?.results?.map((item: any) => [item?.code, item?.nameRu, item?.nameKz])
                return array || []
        }, [data])

        return (
                <TableHandbook
                        total={1}
                        page={page}
                        col_one="'Код позиции"
                        col_two="Наименование (рус)"
                        col_desc="Наименование (каз)"
                        data={dataSource}
                        setPage={setPage}
                />
        )
}

export default Position