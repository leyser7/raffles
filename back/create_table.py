import boto3

dynamodb = boto3.resource(
    'dynamodb',
    region_name='us-east-1',
    endpoint_url="http://localhost:4566"
)

table = dynamodb.create_table(
    TableName='tickets',
    KeySchema=[
        {
            'AttributeName': 'id',
            'KeyType': 'HASH'
        },
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'id',
            'AttributeType': 'S'
        },
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

table.meta.client.get_waiter('table_exists').wait(TableName='tickets')
