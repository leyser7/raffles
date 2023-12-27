import boto3

dynamodb = boto3.resource(
    'dynamodb',
    region_name='us-east-1',
    endpoint_url="http://localhost:4566"
)


table = dynamodb.Table('tickets')

for i in range(100):
    ticket_id = str(i).zfill(2)

    table.put_item(
        Item={
            'id': ticket_id,
            'name': '',
            'state': 'available'

        }
    )

print("100 tickets generados.")
