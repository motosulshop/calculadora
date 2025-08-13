<?php
header("Access-Control-Allow-Origin: https://calculadora-gray-three.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");



$host = 'localhost';
$db = 'motosulshop';
$user = 'seu_usuario_mysql';
$pass = 'sua_senha_mysql';


// Conexão com o banco
$conn = new mysqli($host, $user, $pass, $db);

// Verifica conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao conectar ao banco: " . $conn->connect_error]);
    exit;
}

// Lê os dados JSON enviados pelo Angular
$data = json_decode(file_get_contents("php://input"), true);

// Prepara os dados (ou null se não existir)
$origem_lead = $data['origem_lead'] ?? null;
$destino_lead = $data['destino_lead'] ?? null;
$nome_cliente = $data['nome_cliente'] ?? null;
$fone_cliente = $data['fone_cliente'] ?? null;
$data_contato = $data['data_contato'] ?? null;
$item_pesquisado = $data['item_pesquisado'] ?? null;
$vendedor_ativo = $data['vendedor_ativo'] ?? null;
$data_conclusao = $data['data_conclusao'] ?? null;
$resumo_final = $data['resumo_final'] ?? null;
$valor_vendido = $data['valor_vendido'] ?? null;
$data_nascimento_cliente = $data['data_nascimento_cliente'] ?? null;
$agendamento_contato_futuro = $data['agendamento_contato_futuro'] ?? null;
$outras_observacoes = $data['outras_observacoes'] ?? null;

// Prepara a SQL com parâmetros
$stmt = $conn->prepare("
    INSERT INTO contatos_leads (
        origem_lead, destino_lead, nome_cliente, fone_cliente, data_contato,
        item_pesquisado, vendedor_ativo, data_conclusao, resumo_final, valor_vendido,
        data_nascimento_cliente, agendamento_contato_futuro, outras_observacoes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

// Verifica se o prepare funcionou
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao preparar a consulta: " . $conn->error]);
    exit;
}

// Vincula os parâmetros
$stmt->bind_param(
    "sssssssssdsss",
    $origem_lead, $destino_lead, $nome_cliente, $fone_cliente, $data_contato,
    $item_pesquisado, $vendedor_ativo, $data_conclusao, $resumo_final, $valor_vendido,
    $data_nascimento_cliente, $agendamento_contato_futuro, $outras_observacoes
);

// Executa e responde
if ($stmt->execute()) {
    echo json_encode(["mensagem" => "Lead inserido com sucesso."]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao inserir lead: " . $stmt->error]);
}

// Encerra
$stmt->close();
$conn->close();
?>
