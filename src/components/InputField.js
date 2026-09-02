import { Text, TextInput } from 'react-native'
import { styles } from '../styles/cadastroStyles'

/**
 * Componente reutilizável para campos de entrada de texto
 *
 * Props:
 * - label: texto do rótulo acima do campo
 * - value: valor atual do campo (controlado pelo useState)
 * - onChangeText: função para atualizar o valor
 * - placeholder: texto de exemplo dentro do campo
 * - keyboardType: tipo de teclado ('default', 'numeric', 'email-address', 'phone-pad')
 * - maxLength: limite de caracteres (opcional)
 * - autoCapitalize: capitalização automática (opcional)
 * - secureTextEntry: oculta o texto (para senhas) (opcional)
 */
export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  autoCapitalize = 'sentences',
  secureTextEntry = false,
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </>
  )
}
