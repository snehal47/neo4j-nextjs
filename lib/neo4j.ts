import neo4j from 'neo4j-driver';
import { Query } from 'neo4j-driver-core/types/types';

const driver = neo4j.driver(
    process.env.NEO4J_URI ?? '',
    neo4j.auth.basic(
        process.env.NEO4J_USERNAME ?? '',
        process.env.NEO4J_PASSWORD ?? ''
    )
)

export async function read(cypher: Query, params = {}) {
    const session = driver.session()
    try {
        const res = await session.executeRead(tx => tx.run(cypher, params))
        const values = res.records.map(record => record.toObject())
        return values
    }
    finally {
        await session.close()
    }
}
  
  export async function write(cypher: Query, params = {}) {
    const session = driver.session()
    try {
        const res = await session.executeWrite(tx => tx.run(cypher, params))
        const values = res.records.map(record => record.toObject())
        return values
    }
    finally {
        await session.close()
    }
}
